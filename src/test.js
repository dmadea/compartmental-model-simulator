const pako = require('pako');


function encodeState(state) {
    let compressed = pako.deflate(JSON.stringify(state));
    return Buffer.from(compressed).toString('base64');
}

function decodeState(base64Str) {
    let arr = Buffer.from(base64Str, 'base64');
    return JSON.parse(pako.inflate(arr, { to: 'string' }));
}

// const test = { my: 'er', puper: [456, 567,  '34678žýáíščáéí'], awesome: 'pak!!o' };

const state = [
    "A = B = C = D = E",
    [1.45896, 2.588, 4.5456, 5.8786, 6, 8, 1.2],
    [55, 44.455, 22, 756.5486, 23.888, 44522.55],
    true, 'black', 'linear', 2,
    true, false, 'bck', 'linear', 2
]

// const state = {
//     a: "A = B = C = D = E",
//     b: [1, 2, 4, 5, 6, 8, 1.2],
//     c: [55, 44, 22, 756, 23, 44522],

//     d: {
//         showgrid: true,
//         zeroline: false,
//         linecolor: 'black',
//         type: 'linear',
//         linewidth: 2,
//     },
//     e: {
//         showgrid: true,
//         zeroline: false,
//         type: 'linear',
//         linecolor: 'black',
//         linewidth: 2,
//     },
//     f: true,
//     g: false 
// }

const compressed = encodeState(state);

// console.log(compressed);
console.log(compressed);
console.log(compressed.length);
// console.log(base642ByteArray(compressed));

const restored = decodeState(compressed);

console.log(restored);