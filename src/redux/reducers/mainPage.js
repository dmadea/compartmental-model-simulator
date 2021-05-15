import * as type from '../types';


export const sliderDataTemplate = {
    texName: '', // latex name
    value: 5.0,
    log: false, // logarithmic slider
    min: 0.0, // minimum value on a slider
    max: 10.0  // maximum value on a slider
}

const plotDataTemplate = {
    x: [],
    y: [],
    mode: 'lines',
    type: 'scatter',
    name: ''
};

const initState = {
    initConds: [],  // initial conditons, consists of sliderDataTemplate template objects
    forwardRates: [],  // forward rates
    backwardRates: [],  // backward rates
    schemeText: "A = B = C = D = E",  // text in scheme
    texEquation: '',  // latex set of differential equations
    texModel: '',  // latex model (nicely drawn scheme)
    cbNonZero: false,  // use non zero backward rates
    model: null, // general model
    range: [0, 20],
    algorithm: 'rk45',
    steps: 200,

    figure: {
        data: [
            { ...plotDataTemplate }  // here are data for plots
        ],
        layout: {
            title: '',
            xaxis: {
                title: 'Time',
                showgrid: true,
                zeroline: false,
                linecolor: 'black',
                type: 'linear',
                linewidth: 2,
                mirror: true
            },
            yaxis: {
                title: 'Concentration',
                showgrid: true,
                zeroline: false,
                type: 'linear',
                linecolor: 'black',
                linewidth: 2,
                mirror: true
            },
            autosize: true

        },
        frames: [],
        config: { scrollZoom: true, responsive: false },
        revision: 0  // when this value is changed, it forces the plot to redraw
    }
}

function simulateModel(state) {
    // simulates the model and modifies the state

    let comps = state.model.getCompartments();
    let solution = state.model.simulateModel(state.steps, state.range, !state.cbNonZero);

    // update figure data
    const data = new Array(comps.length);

    for (let i = 0; i < comps.length; i++) {
        data[i] = { ...plotDataTemplate }
        data[i].x = solution.xVals;
        data[i].y = solution.yVals[i];
        data[i].name = `${comps[i]}`;
    }

    state.figure.revision += 1;
    state.figure.data = data;
}


export default function mainPage(state = initState, action) {
    const newState = { ...state };

    switch (action.type) {
        case type.INITIAL_CONDITION_CHANGED:
            let comps = state.model.getCompartments();
            newState.initConds[action.index].value = action.value;
            newState.model.initial_conditions[comps[action.index]] = action.value;
            simulateModel(newState);
            return newState;

        case type.FORWARD_RATE_CHANGED:
            newState.forwardRates[action.index].value = action.value;
            newState.model.elem_reactions[action.index].forward_rate = action.value;
            simulateModel(newState);
            return newState;

        case type.BACKWARD_RATE_CHANGED:
            newState.backwardRates[action.index].value = action.value;
            newState.model.elem_reactions[action.index].backward_rate = action.value;
            simulateModel(newState);
            return newState;

        case type.INIT_SLIDER_VARS_CHANGED:
            newState.initConds[action.index].min = action.min;
            newState.initConds[action.index].max = action.max;
            newState.initConds[action.index].log = action.log;

            return newState;

        case type.FORWARD_SLIDER_VARS_CHANGED:
            newState.forwardRates[action.index].min = action.min;
            newState.forwardRates[action.index].max = action.max;
            newState.forwardRates[action.index].log = action.log;

            return newState;

        case type.BACKWARD_SLIDER_VARS_CHANGED:
            newState.backwardRates[action.index].min = action.min;
            newState.backwardRates[action.index].max = action.max;
            newState.backwardRates[action.index].log = action.log;

            return newState;

        case type.SET_SCHEME_AND_CB_NON_ZERO:
            newState.schemeText = action.text;
            newState.cbNonZero = action.cbNonZero;

            return newState;

        case type.CB_NON_ZERO_CHECKED_CHANGED:
            newState.cbNonZero = !state.cbNonZero;
            simulateModel(newState);

            return newState;

        case type.SET_SCHEME_TEXT:
            newState.schemeText = action.text;

            return newState;

        case type.SET_LOG_X:
            newState.figure.layout.xaxis.type = (state.figure.layout.xaxis.type === 'linear') ? 'log' : 'linear';
            newState.figure.revision += 1;
            return newState;

        case type.SET_LOG_Y:
            newState.figure.layout.yaxis.type = (state.figure.layout.yaxis.type === 'linear') ? 'log' : 'linear';
            newState.figure.revision += 1;
            return newState;

        case type.SET_GENERAL_MODEL:
            newState.model = action.model;
            newState.initConds = action.initConds;
            newState.forwardRates = action.forwardRates;
            newState.backwardRates = action.backwardRates;

            newState.texEquation = newState.cbNonZero ? newState.model.diffEquations : newState.model.diffEquationsFRates;
            newState.texModel = newState.cbNonZero ? newState.model.latexModel : newState.model.latexModelFRates;

            simulateModel(newState);

            return newState;

        default:
            return state
    }
}
