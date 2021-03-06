// import logo from './img/logo.svg';
import React, { useEffect } from 'react';
// import InputSlider from './Slider.js'
import InitCondTable from './initCondTable';
import RatesTable from './ratesTable'
import Grid from '@material-ui/core/Grid';
// import TextArea from './textArea';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import PlotlyGraph from './graph';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Button from '@material-ui/core/Button';

import { GeneralModel } from '../general_model';
import { kineticModels } from '../models';

import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
// import { Button, TextareaAutosize } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';

import { cbNonZeroCheckedChanged, setSchemeText, setGeneralModel, toggleLogX, toggleLogY, setSchemeAndcbNonZero } from '../redux/actions/mainPage';
import { sliderDataTemplate } from '../redux/reducers/mainPage';
import { decodeJson } from '../compress';


export default function MainPage(props) {

  const state = useSelector(state => state.mainPage);
  const dispatch = useDispatch();

  const stateBase64 = props.match.params.state;
  const decodedState = decodeJson(stateBase64);
  console.log(decodedState);

  // component did mount
  useEffect(() => {
    submitModel();
  }, []);

  function submitModel(selectedModel = null, schemeText = null) {

    let text = selectedModel === null ? state.schemeText : schemeText;

    if (text === "" || text.match(/[^\s]+/g) === null) {
      alert('Scheme is empty!');
      return;
    }

    var model = GeneralModel.fromText(text);
    let comps = model.getCompartments();
    let compsF = model.getLatexFormattedCompartments();
    let rateNames = model.getRateNames(false, true);

    let lastInitConds = state.initConds;

    let initConds = new Array(comps.length);

    for (let i = 0; i < initConds.length; i++) {
      // value from previous model
      let init_value = (i < lastInitConds.length) ? lastInitConds[i].value : model.initial_conditions[comps[i]];
      let log = (i < lastInitConds.length) ? lastInitConds[i].log : false;

      let condition = selectedModel === null;

      initConds[i] = { ...sliderDataTemplate };

      initConds[i].texName = compsF[i];
      initConds[i].value = condition ? init_value : selectedModel.initialConditions[comps[i]].value;
      initConds[i].log = condition ? log : selectedModel.initialConditions[comps[i]].logSlider;
      initConds[i].min = condition ? 0 : selectedModel.initialConditions[comps[i]].min;
      initConds[i].max = condition ? 50 : selectedModel.initialConditions[comps[i]].max;

      // transfer params to model
      model.initial_conditions[comps[i]] = initConds[i].value;
    }

    let lastForwardRates = state.forwardRates;
    let lastBackwardRates = state.backwardRates;

    let forwardRates = new Array(rateNames.length);
    let backwardRates = new Array(rateNames.length);

    for (let i = 0; i < rateNames.length; i++) {
      // values from previous model
      let fr_val = (i < lastForwardRates.length) ? lastForwardRates[i].value : model.elem_reactions[i].forward_rate;
      let br_val = (i < lastBackwardRates.length) ? lastBackwardRates[i].value : model.elem_reactions[i].backward_rate;

      let log_fr = (i < lastForwardRates.length) ? lastForwardRates[i].log : false;
      let log_br = (i < lastBackwardRates.length) ? lastBackwardRates[i].log : false;

      let condition = selectedModel === null || typeof selectedModel.rates === 'undefined';

      forwardRates[i] = { ...sliderDataTemplate };
      backwardRates[i] = { ...sliderDataTemplate };

      forwardRates[i].texName = rateNames[i];
      forwardRates[i].value = condition ? fr_val : selectedModel.rates[i].forwardRate;
      forwardRates[i].log = condition ? log_fr : selectedModel.rates[i].forwardRateLogSlider;
      forwardRates[i].min = condition ? 0 : selectedModel.rates[i].forwardRateMin;
      forwardRates[i].max = condition ? 10 : selectedModel.rates[i].forwardRateMax;

      backwardRates[i].texName = rateNames[i];
      backwardRates[i].value = condition ? br_val : selectedModel.rates[i].backwardRate;
      backwardRates[i].log = condition ? log_br : selectedModel.rates[i].backwardRateLogSlider;
      backwardRates[i].min = condition ? 0 : selectedModel.rates[i].backwardRateMin;
      backwardRates[i].max = condition ? 10 : selectedModel.rates[i].backwardRateMax;

      // transfer params to model
      model.elem_reactions[i].forward_rate = forwardRates[i].value;
      model.elem_reactions[i].backward_rate = backwardRates[i].value;
    }

    model.buildFunc();

    dispatch(setGeneralModel(model, initConds, forwardRates, backwardRates));

  }

  function modelChanged(event, objectChosen) {
    if (objectChosen === null)
      return
    dispatch(setSchemeAndcbNonZero(objectChosen.scheme, objectChosen.nonZeroBackwardRates));
    submitModel(objectChosen, objectChosen.scheme); // need to pass chosen model scheme text
  }

  function handleCBChange(event) {
    dispatch(cbNonZeroCheckedChanged());
  }


  return (
    <div>
      <Grid container spacing={1} alignItems="stretch" alignCoontent="center" direction="column">
        <Grid item xs={false} sm={3} />
        <Grid item xs={12} sm={6}>

          <Autocomplete
            options={kineticModels.sort((a, b) => -b.class.localeCompare(a.class))}
            groupBy={(option) => option.class}
            getOptionLabel={(option) => option.name}
            onChange={modelChanged}
            renderInput={(params) => <TextField {...params} label="Kinetics models" variant="outlined" />}
          />

          {/* <TextArea modelSubmitCallback={modelSubmitted} /> */}

          <div>
            <TextareaAutosize
              onChange={event => dispatch(setSchemeText(event.target.value))}
              aria-label="empty textarea"
              placeholder=">> Place kinetic model here <<"
              style={{ fontSize: 18, fontFamily: 'Palatino' }}
              value={state.schemeText}>
            </TextareaAutosize>

          </div>
          <Button variant="contained"
            onClick={() => submitModel()}
            color="primary">Submit</Button>

          <FormControlLabel
            control={<Checkbox color="secondary" checked={state.cbNonZero} onChange={handleCBChange} name="cbNonZero" />}
            label="Non-zero backwards rates"
          />

          <BlockMath math={`${state.texModel} `} errorColor={'#cc0000'} />  {/* without space it will through an error: KaTeX can only parse string typed expression */}
          <BlockMath math={`${state.texEquation} `} errorColor={'#cc0000'} />  {/* without space it will through an error: KaTeX can only parse string typed expression */}

          <InitCondTable />
          <RatesTable />

          <ToggleButton
            selected={(state.figure.layout.xaxis.type === 'linear') ? false : true}
            onChange={() => dispatch(toggleLogX())}
          >Log x</ToggleButton>

          <ToggleButton
            selected={(state.figure.layout.yaxis.type === 'linear') ? false : true}
            onChange={() => dispatch(toggleLogY())}
          >Log y</ToggleButton>

        </Grid>
        <Grid item xs={12} sm={6}>
          <PlotlyGraph />
        </Grid>
        <Grid item xs={false} sm={3} />
      </Grid>
    </div>
  );
}



// export default MainPage;


 // console.log(state);

  // constructor() {
  //   super()
  //   this.state = {
  //     initData: [],
  //     ratesData: [],
  //     schemeText: "A = B = C = D = E",
  //     // schemeText: "S + I = 2I\nI = R = S",

  //     figure: {
  //       data: [],
  //       layout: {
  //         xaxis: {
  //           title: 'Time',
  //           showgrid: true,
  //           zeroline: false,
  //           linecolor: 'black',
  //           type: 'linear',
  //           linewidth: 2,
  //           mirror: true
  //         },
  //         yaxis: {
  //           title: 'Concentration',
  //           showgrid: true,
  //           zeroline: false,
  //           type: 'linear',
  //           linecolor: 'black',
  //           linewidth: 2,
  //           mirror: true
  //         },
  //         autosize: true

  //       },
  //       frames: [],
  //       config: { scrollZoom: true, responsive: false },
  //       revision: 0  // when this value is changed, it forces the plot to redraw
  //     },

  //     texEquation: '',
  //     texModel: '',
  //     cbNonZero: false
  //   };

  //   this.model = null;
  //   this.modelSubmitted = this.modelSubmitted.bind(this);
  //   this.sliderValueChanged = this.sliderValueChanged.bind(this);
  //   this.cbNonZero_checkedChanged = this.cbNonZero_checkedChanged.bind(this);
  //   this.textChangedCallback = this.textChangedCallback.bind(this);
  //   this.sliderLogToggledCallback = this.sliderLogToggledCallback.bind(this);
  //   this.modelChanged = this.modelChanged.bind(this);
  //   // this.tbLogXChanged = this.tbLogXChanged.bind(this);
  //   // this.transferParsToModel = this.transferParsToModel.bind(this);

  //   // this.options = top100Films.map((option) => {
  //   //   const firstLetter = option.title[0].toUpperCase();
  //   //   return {
  //   //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
  //   //     ...option,
  //   //   };
  //   // });

  //   // console.log(this.options) 

  // }

  // componentDidMount() {
  //   this.modelSubmitted();  // load default model after all components have loaded
  // }

  // function simulModel(useZeroBR = false) {
  //   let range = [0, 10];
  //   let steps = 200;

  //   let comps = this.model.getCompartments();
  //   let solution = this.model.simulateModel(steps, range, useZeroBR);

  //   //var graphData = new Array(comps.length);

  //   var figure = this.state.figure

  //   // update figure data
  //   let diff = comps.length - figure.data.length;  // difference in number of current compartments and from new model
  //   if (diff > 0) {
  //     for (let i = 0; i < diff; i++)
  //       figure.data.push({
  //         x: [],
  //         y: [],
  //         mode: 'lines',
  //         type: 'scatter',
  //         name: ''
  //       });
  //   } else if (diff < 0) {
  //     for (let i = 0; i < -diff; i++)
  //       figure.data.pop();
  //   }

  //   for (let i = 0; i < comps.length; i++) {
  //     figure.data[i].x = solution.xVals
  //     figure.data[i].y = solution.yVals[i]
  //     figure.data[i].name = `${comps[i]}`
  //   }
  //   figure.revision += 1

  //   return figure;
  // }

  // function textChangedCallback(text) {
  //   this.setState({
  //     schemeText: text
  //   })
  // }

  // function modelSubmitted(selecteModel) {
  //   let scheme = this.state.schemeText

  //   if (scheme === "" || scheme.match(/[^\s]+/g) === null) {
  //     alert('Scheme is empty!');
  //     return;
  //   }

  //   let lastInitData = this.state.initData;
  //   let lastRatesData = this.state.ratesData;

  //   this.model = GeneralModel.fromText(scheme);
  //   let comps = this.model.getCompartments();
  //   let compsF = this.model.getLatexFormattedCompartments();
  //   let rateNames = this.model.getRateNames(false, true);

  //   let initData = new Array(comps.length);

  //   for (let i = 0; i < initData.length; i++) {
  //     // value from previous model
  //     let init_value = (i < lastInitData.length) ? lastInitData[i].init : this.model.initial_conditions[comps[i]];
  //     let log = (i < lastInitData.length) ? lastInitData[i].log : false;

  //     let condition = typeof selecteModel === 'undefined';

  //     initData[i] = {
  //       texName: compsF[i],
  //       init: condition ? init_value : selecteModel.initialConditions[comps[i]].value,
  //       log: condition ? log : selecteModel.initialConditions[comps[i]].logSlider,
  //       min: condition ? 0 : selecteModel.initialConditions[comps[i]].min,
  //       max: condition ? 50 : selecteModel.initialConditions[comps[i]].max
  //     }
  //     // transfer params to model
  //     this.model.initial_conditions[comps[i]] = initData[i].init;
  //   }

  //   // comps.map((c, i) => ({
  //   //   texName: compsF[i], 
  //   //   init: (i < lastInitData.length) ? lastInitData[i].init : this.model.initial_conditions[c]
  //   // }));

  //   let ratesData = new Array(rateNames.length);
  //   for (let i = 0; i < rateNames.length; i++) {
  //     // values from previous model
  //     let fr_val = (i < lastRatesData.length) ? lastRatesData[i].fr : this.model.elem_reactions[i].forward_rate;
  //     let br_val = (i < lastRatesData.length) ? lastRatesData[i].br : this.model.elem_reactions[i].backward_rate;

  //     let log_fr = (i < lastRatesData.length) ? lastRatesData[i].log_fr : false;
  //     let log_br = (i < lastRatesData.length) ? lastRatesData[i].log_br : false;

  //     let condition = typeof selecteModel === 'undefined' || typeof selecteModel.rates === 'undefined';

  //     ratesData[i] = {
  //       texName: rateNames[i],
  //       fr: condition ? fr_val : selecteModel.rates[i].forwardRate,
  //       br: condition ? br_val : selecteModel.rates[i].backwardRate,
  //       log_fr: condition ? log_fr : selecteModel.rates[i].forwardRateLogSlider,
  //       log_br: condition ? log_br : selecteModel.rates[i].backwardRateLogSlider,
  //       min_fr: condition ? 0 : selecteModel.rates[i].forwardRateMin,
  //       max_fr: condition ? 10 : selecteModel.rates[i].forwardRateMax,
  //       min_br: condition ? 0 : selecteModel.rates[i].backwardRateMin,
  //       max_br: condition ? 10 : selecteModel.rates[i].forwardRateMax
  //     }
  //     // transfer params to model
  //     this.model.elem_reactions[i].forward_rate = ratesData[i].fr;
  //     this.model.elem_reactions[i].backward_rate = ratesData[i].br;
  //   }

  //   this.model.buildFunc();

  //   let figure = this.simulModel(!this.state.cbNonZero);

  //   this.setState({
  //     initData: initData,
  //     ratesData: ratesData,
  //     figure: figure,
  //     texEquation: this.state.cbNonZero ? this.model.diffEquations : this.model.diffEquationsFRates,
  //     texModel: this.state.cbNonZero ? this.model.latexModel : this.model.latexModelFRates
  //   });
  // }

  // function sliderLogToggledCallback(type, index) {

  //   let initData = this.state.initData;
  //   let ratesData = this.state.ratesData;

  //   switch (type) {
  //     case "init":  // changing of initial conditions
  //       initData[index].log = !initData[index].log;
  //       break;
  //     case "fr":   // changing of forward rate constants
  //       ratesData[index].log_fr = !ratesData[index].log_fr;
  //       break;
  //     case "br":   // changing of backward rate constants
  //       ratesData[index].log_br = !ratesData[index].log_br;
  //       break;
  //   }
  //   this.setState({
  //     initData: initData,
  //     ratesData: ratesData
  //   });
  // }

  // function sliderValueChanged(type, index, value) {
  //   // console.log(name, value);

  //   // let split = name.split('_');
  //   // let text = split[0];
  //   // let num = parseInt(split[1]);
  //   let f_val = parseFloat(value);

  //   let initData = this.state.initData;
  //   let ratesData = this.state.ratesData;

  //   switch (type) {
  //     case "init":  // changing of initial conditions
  //       let comps = this.model.getCompartments();
  //       this.model.initial_conditions[comps[index]] = f_val;
  //       initData[index].init = f_val;
  //       break;
  //     case "fr":   // changing of forward rate constants
  //       this.model.elem_reactions[index].forward_rate = f_val;
  //       ratesData[index].fr = f_val;
  //       break;
  //     case "br":   // changing of backward rate constants
  //       this.model.elem_reactions[index].backward_rate = f_val;
  //       ratesData[index].br = f_val;
  //       break;
  //   }

  //   let figure = this.simulModel(!this.state.cbNonZero);

  //   this.setState({
  //     figure: figure,
  //     initData: initData,
  //     ratesData: ratesData
  //   });
  // }

  // function modelChanged(event, objectChosen) {
  //   if (objectChosen === null)
  //     return
  //   this.state.schemeText = objectChosen.scheme;
  //   this.state.cbNonZero = objectChosen.nonZeroBackwardRates;
  //   // console.log(objectChosen.scheme)
  //   this.modelSubmitted(objectChosen);
  // }