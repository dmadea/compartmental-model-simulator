const pako = require('pako');

export function encodeJson(obj) {
    //  compressed the json object into ByteArray and then converts this to base64 string which it returns
    // if error occurs, null is returned
    try {
        let compressed = pako.deflate(JSON.stringify(obj));
        let base64Str = Buffer.from(compressed).toString('base64');
        return base64Str.replace(/\//g, '-'); // replace / characters with -
    } catch (e) {
        // console.log(e);
        return null;
    }
}

export function decodeJson(str) {
    //  Converts the base64Str to ByteArray and then decompresses it into json object which it returns
    // if error occurs, null is returned
    try {
        let base64Str = str.replace(/-/g, '/');  // replace - characters with /
        let arr = Buffer.from(base64Str, 'base64');
        return JSON.parse(pako.inflate(arr, { to: 'string' }));
    } catch (e) {
        // console.log(e);
        return null;
    }
}

// const stateValues = [
//     // initial conditions
//     [
//         [value, log, min, max],
//         [value, log, min, max],
//     ],
//     // forward rates
//     [
//         [value, log, min, max],
//         [value, log, min, max],
//     ],
//     // backward rates
//     [
//         [value, log, min, max],
//         [value, log, min, max],
//     ],
//     schemeText,
//     cbNonZero,
//     [start, end], // range
//     algorithm,
//     steps,
//     timeUnit,
//     xAxisType,
//     yAxisType,
// ]

export function getStateValues(stateMainPage) {
    const stateValues = [
        stateMainPage.initConds.map(d => [d.value, d.log, d.min, d.max]),
        stateMainPage.forwardRates.map(d => [d.value, d.log, d.min, d.max]),
        stateMainPage.backwardRates.map(d => [d.value, d.log, d.min, d.max]),
        stateMainPage.schemeText,
        stateMainPage.cbNonZero,
        stateMainPage.range,
        stateMainPage.algorithm,
        stateMainPage.steps,
        stateMainPage.timeUnit,
        stateMainPage.figure.layout.xaxis.type,
        stateMainPage.figure.layout.yaxis.type,
    ];
    return stateValues;
}


// const sliderDataTemplate = {
//     texName: '', // latex name
//     value: 5.0,
//     log: false, // logarithmic slider
//     min: 0.0, // minimum value on a slider
//     max: 10.0  // maximum value on a slider
// }

// const plotDataTemplate = {
//     x: [],
//     y: [],
//     mode: 'lines',
//     type: 'scatter',
//     name: ''
// };

// const initState = {
//     initConds: [],  // initial conditons, consists of sliderDataTemplate objects
//     forwardRates: [],  // forward rates
//     backwardRates: [],  // backward rates
//     schemeText: "A = B = C = D = E",  // text in scheme
//     texEquation: '',  // latex set of differential equations
//     texModel: '',  // latex model (nicely drawn scheme)
//     cbNonZero: false,  // use non zero backward rates
//     model: null, // general model
//     range: [0, 20],
//     algorithm: 'rk45',
//     steps: 200,

//     figure: {
//         data: [
//             { ...plotDataTemplate }  // here are data for plots
//         ],
//         layout: {
//             title: '',
//             xaxis: {
//                 title: 'Time',
//                 showgrid: true,
//                 zeroline: false,
//                 linecolor: 'black',
//                 type: 'linear',
//                 linewidth: 2,
//                 mirror: true
//             },
//             yaxis: {
//                 title: 'Concentration',
//                 showgrid: true,
//                 zeroline: false,
//                 type: 'linear',
//                 linecolor: 'black',
//                 linewidth: 2,
//                 mirror: true
//             },
//             autosize: true

//         },
//         frames: [],
//         config: { scrollZoom: true, responsive: false },
//         revision: 0  // when this value is changed, it forces the plot to redraw
//     }
// }


// const test = { my: 'er', puper: [456, 567,  '34678žýáíščáéí'], awesome: 'pak!!o' };

// const state = [
//     "A = B = C = D = E",
//     [1.45896, 2.588, 4.5456, 5.8786, 6, 8, 1.2],
//     [55, 44.455, 22, 756.5486, 23.888, 44522.55],
//     true, 'black', 'linear', 2,
//     true, false, 'bck', 'linear', 2
// ]


// let compressed = encodeState(state);

// // const compressed = 'eJxVizsOwkAMBa8SuX6yFGM7pqDgd4rVFgsKEmJFEeD+OKKimObNvEL7YTcckmNySs6EMrJabB3CFgFlU3MYxxQOR2BkqShmUM3SIILJPLP0suFYT2qSd6t4L58ZdOnt+iBQvz-nthDkt99af63239UvyPglAA==';

// console.log(compressed);

// const restored = decodeState(compressed);

// console.log(restored);

