import logo from './logo.svg';
import React from 'react';
import './App.css';
// import InputSlider from './Slider.js'
import InitCondTable from './initCondTable.js';
import RatesTable from './ratesTable.js'
import Grid from '@material-ui/core/Grid';
import TextArea from './textArea.js';
import { GeneralModel } from './general_model.js';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';
import { kineticModels } from './models.js';

// import React from 'react';
// import Icon from '@material-ui/core/Icon';
import PlotlyGraph from './graph.js'

import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';


class App extends React.Component {

  constructor() {
    super()
    this.state = {
      initData: [],
      ratesData: [],
      schemeText: "A = B = C = D = E",
      // schemeText: "S + I = 2I\nI = R = S",

      figure: {
        data: [],
        layout: {
          xaxis: {
            title: 'Time',
            showgrid: true,
            zeroline: false,
            linecolor: 'black',
            linewidth: 2,
            mirror: true
          },
          yaxis: {
              title: 'Concentration',
              showgrid: true,
              zeroline: false,
              // type: 'log',
              linecolor: 'black',
              linewidth: 2,
              mirror: true
          },
          autosize: true
          
        },
        frames: [], 
        config: {scrollZoom: true, responsive: false},
        revision: 0  // when this value is changed, it forces the plot to redraw
      },

      texEquation: '',
      cbNonZero: false
    };

    this.model = null;
    this.modelSubmitted = this.modelSubmitted.bind(this);
    this.sliderValueChanged = this.sliderValueChanged.bind(this);
    this.cbNonZero_checkedChanged = this.cbNonZero_checkedChanged.bind(this);
    this.textChangedCallback = this.textChangedCallback.bind(this);
    this.sliderLogToggledCallback = this.sliderLogToggledCallback.bind(this);
    this.modelChanged = this.modelChanged.bind(this);
    // this.transferParsToModel = this.transferParsToModel.bind(this);

    // this.options = top100Films.map((option) => {
    //   const firstLetter = option.title[0].toUpperCase();
    //   return {
    //     firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
    //     ...option,
    //   };
    // });

    // console.log(this.options)

  }

  componentDidMount() {
    this.modelSubmitted();  // load default model after all components have loaded
  }

  simulModel(useZeroBR=false) {
    let range = [0, 10];
    let steps = 200;

    let comps = this.model.getCompartments();
    let solution = this.model.simulateModel(steps, range, useZeroBR);

    //var graphData = new Array(comps.length);

    var figure = this.state.figure

    // update figure data
    let diff = comps.length - figure.data.length;  // difference in number of current compartments and from new model
    if (diff > 0) {
        for (let i = 0; i < diff; i++)
          figure.data.push({
              x: [],
              y: [],
              mode: 'lines',
              type: 'scatter',
              name: ''
            });
    } else if (diff < 0){
        for (let i = 0; i < -diff; i++)
            figure.data.pop();
    }

    for (let i = 0; i < comps.length; i++) {
      figure.data[i].x = solution.xVals
      figure.data[i].y = solution.yVals[i]
      figure.data[i].name = `${comps[i]}`
    }
    figure.revision += 1

    return figure;
  }

  textChangedCallback(text) {
    this.setState({
      schemeText: text
    })
  }

  modelSubmitted(selecteModel) {
    let scheme = this.state.schemeText

    if (scheme === "" || scheme.match(/[^\s]+/g) === null){
      alert('Scheme is empty!');
      return;
    }

    let lastInitData = this.state.initData;
    let lastRatesData = this.state.ratesData;

    this.model = GeneralModel.fromText(scheme);
    let comps = this.model.getCompartments();
    let compsF = this.model.getLatexFormattedCompartments();
    let rateNames = this.model.getRateNames();

    let initData = new Array(comps.length);

    for (let i = 0; i < initData.length; i++) {
      // value from previous model
      let init_value = (i < lastInitData.length) ? lastInitData[i].init : this.model.initial_conditions[comps[i]];
      let log = (i < lastInitData.length) ? lastInitData[i].log : false;

      let condition = typeof selecteModel === 'undefined';

      initData[i] = {
        texName: compsF[i], 
        init: condition ? init_value : selecteModel.initialConditions[comps[i]].value,
        log: condition? log : selecteModel.initialConditions[comps[i]].logSlider,
        min: condition? 0 : selecteModel.initialConditions[comps[i]].min,
        max: condition? 50 : selecteModel.initialConditions[comps[i]].max
      }
      // transfer params to model
      this.model.initial_conditions[comps[i]] = initData[i].init;
    }
    
    // comps.map((c, i) => ({
    //   texName: compsF[i], 
    //   init: (i < lastInitData.length) ? lastInitData[i].init : this.model.initial_conditions[c]
    // }));

    let ratesData = new Array(rateNames.length);
    for (let i = 0; i < rateNames.length; i++) {
      // values from previous model
      let fr_val = (i < lastRatesData.length) ? lastRatesData[i].fr : this.model.elem_reactions[i].forward_rate;
      let br_val = (i < lastRatesData.length) ? lastRatesData[i].br : this.model.elem_reactions[i].backward_rate;

      let log_fr = (i < lastRatesData.length) ? lastRatesData[i].log_fr : false;
      let log_br = (i < lastRatesData.length) ? lastRatesData[i].log_br : false;

      let condition = typeof selecteModel === 'undefined' || typeof selecteModel.rates === 'undefined';

      ratesData[i] = {
        texName:  rateNames[i],
        fr: condition ? fr_val : selecteModel.rates[i].forwardRate,
        br: condition ? br_val : selecteModel.rates[i].backwardRate,
        log_fr: condition ? log_fr : selecteModel.rates[i].forwardRateLogSlider, 
        log_br: condition ? log_br : selecteModel.rates[i].backwardRateLogSlider,
        min_fr: condition ? 0 : selecteModel.rates[i].forwardRateMin,
        max_fr: condition ? 10 : selecteModel.rates[i].forwardRateMax,
        min_br: condition ? 0 : selecteModel.rates[i].backwardRateMin,
        max_br: condition ? 10 : selecteModel.rates[i].forwardRateMax
      }
      // transfer params to model
      this.model.elem_reactions[i].forward_rate = ratesData[i].fr;
      this.model.elem_reactions[i].backward_rate = ratesData[i].br;
    }

    this.model.buildFunc();

    let figure = this.simulModel(!this.state.cbNonZero);

    this.setState({
      initData: initData,
      ratesData: ratesData,
      figure: figure,
      texEquation: this.state.cbNonZero ? this.model.diffEquations : this.model.diffEquationsFRates
    });
  }

  sliderLogToggledCallback(type, index) {

    let initData = this.state.initData;
    let ratesData = this.state.ratesData;

    switch (type) {
      case "init":  // changing of initial conditions
          initData[index].log = !initData[index].log;
          break;
      case "fr":   // changing of forward rate constants
          ratesData[index].log_fr = !ratesData[index].log_fr;
          break;
      case "br":   // changing of backward rate constants
          ratesData[index].log_br = !ratesData[index].log_br;
          break;
    }
    this.setState({
      initData: initData,
      ratesData: ratesData
    });
  }

  sliderValueChanged(type, index, value) {
    // console.log(name, value);

    // let split = name.split('_');
    // let text = split[0];
    // let num = parseInt(split[1]);
    let f_val = parseFloat(value);

    let initData = this.state.initData;
    let ratesData = this.state.ratesData;

    switch (type) {
        case "init":  // changing of initial conditions
            let comps = this.model.getCompartments();
            this.model.initial_conditions[comps[index]] = f_val;
            initData[index].init = f_val;
            break;
        case "fr":   // changing of forward rate constants
            this.model.elem_reactions[index].forward_rate = f_val;
            ratesData[index].fr = f_val;
            break;
        case "br":   // changing of backward rate constants
            this.model.elem_reactions[index].backward_rate = f_val;
            ratesData[index].br = f_val;
            break;
    }

    let figure = this.simulModel(!this.state.cbNonZero);

    this.setState({
      figure: figure,
      initData: initData,
      ratesData: ratesData
    });
  }

  modelChanged(event, objectChosen) {
    if (objectChosen === null)
      return
    this.state.schemeText = objectChosen.scheme;
    this.state.cbNonZero = objectChosen.nonZeroBackwardRates;
    // console.log(objectChosen.scheme)
    this.modelSubmitted(objectChosen);
  }

  cbNonZero_checkedChanged(event) {

    let figure = this.simulModel(!event.target.checked);

    this.setState({
      texEquation: event.target.checked ? this.model.diffEquations : this.model.diffEquationsFRates,
      cbNonZero: event.target.checked,
      figure: figure
    });
  }

  render() {
    return (
      <div className="App">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>Compartmental model simulator</p>
  
        <Grid container spacing={1} alignItems="column" direction="row">
          <Grid item xs>

            <Autocomplete
              options={kineticModels.sort((a, b) => -b.class.localeCompare(a.class))}
              groupBy={(option) => option.class}
              getOptionLabel={(option) => option.name}
              onChange={this.modelChanged}
              renderInput={(params) => <TextField {...params} label="Kinetics models" variant="outlined" />}
            />
  
            <TextArea schemeText={this.state.schemeText} modelSubmitCallback={this.modelSubmitted} textChangedCallback={this.textChangedCallback}/>

            <FormControlLabel
                control={<Checkbox color="secondary" checked={this.state.cbNonZero} onChange={this.cbNonZero_checkedChanged} name="cbNonZero" />}
                label="Non-zero backwards rates"
            />

            <BlockMath math={`\\begin{aligned} ${this.state.texEquation} \\end{aligned}`} errorColor={'#cc0000'}/>
  
            <InitCondTable 
              data={this.state.initData} 
              sliderChangedCallback={this.sliderValueChanged}
              sliderLogToggledCallback={this.sliderLogToggledCallback}>
            </InitCondTable>

            <RatesTable 
              data={this.state.ratesData} 
              sliderChangedCallback={this.sliderValueChanged}
              sliderLogToggledCallback={this.sliderLogToggledCallback}
              disabled={!this.state.cbNonZero}>
            </RatesTable>
  
          </Grid>
          <Grid item xs>
            <PlotlyGraph 
              data={this.state.figure.data}
              frames={this.state.figure.frames}
              config={this.state.figure.config}
              layout={this.state.figure.layout}
              revision={this.state.figure.revision}
             />
          </Grid>
        </Grid>
      </div>
    );
  }
}


// function App() {
//   return (
//     <div className="App">
//       {/* <img src={logo} className="App-logo" alt="logo" /> */}
//       <p>Application  react</p>

//       <Grid container spacing={1} alignItems="column" direction="row">
//         <Grid item xs>

//           <TextArea text="A = B = C = D = E"/>

//           <InitCondTable data={init}></InitCondTable>
//           <RatesTable data={data}></RatesTable>

//         </Grid>
//         <Grid item xs>
//           <PlotlyGraph />
//         </Grid>
//       </Grid>
//     </div>
//   );
// }


// function App() {
//   return <Button color="primary">Hello World</Button>;
// }

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }


export default App;
