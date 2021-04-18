// from https://github.com/giannotr/runge-kutta-js, modified

// "use strict";
// var __assign = (this && this.__assign) || function () {
//     __assign = Object.assign || function(t) {
//         for (var s, i = 1, n = arguments.length; i < n; i++) {
//             s = arguments[i];
//             for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
//                 t[p] = s[p];
//         }
//         return t;
//     };
//     return __assign.apply(this, arguments);
// };

// var __spreadArrays = (this && this.__spreadArrays) || function () {
//     for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
//     for (var r = Array(s), k = 0, i = 0; i < il; i++)
//         for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
//             r[k] = a[j];
//     return r;
// };

// Object.defineProperty(exports, "__esModule", { value: true });
function _scalarMult (scalar, vector, n) {
    /*
    * Creates a new array.
    */
    var res = new Array(n);
    for (let i = 0; i < n; i++){
        res[i] = vector[i] * scalar;
    }
    return res; 
}

function _vecAdd2Sec (a, b, n) { 
    /*
    * Adds a to second array (b) and returns it !!!!! 
    */
    for (let i = 0; i < n; i++){
        b[i] += a[i];
    }
    return b; 
}


let UndependentVariableError = new Error('The destination of the undependent variable has to be greater than its start');
// let StepSizeDivisibilityError = new Error('The range has to be an divisible by the step size');

export function rungeKutta4(ODE, initialCondition, range=[0, 1], steps=500) {
    var t0 = range[0], t1 = range[1];

    if (t1 <= t0)
        throw UndependentVariableError;

    var stepSize = (t1 - t0) / steps;

    return initialCondition.length > 1 ? 
        rk4Multi(ODE, steps, stepSize, initialCondition, t0) : 
        rk4Single(ODE, steps, stepSize, initialCondition, t0);

    // if (stepSize === void 0) { stepSize = 1; }
    // var _return;
    //     var steps = Math.round((t1 - t0) / stepSize);
    //     // var args = {
    //     //     equation: ODE,
    //     //     start: t0,
    //     //     stepSize: stepSize,
    //     //     steps: steps,
    //     // };
    //     // if (Number.isInteger(steps)) {
    //     if (typeof initialCondition === 'object' && initialCondition.length > 1) {
    //         // _return = rk4Multi(__assign(__assign({}, args), { initialCondition: initialCondition }));
    //         _return = rk4Multi(ODE, steps, stepSize, initialCondition, t0);

    //     }
    //     else {
    //         var _initialCondition = void 0;
    //         if (typeof initialCondition === 'object') {
    //             _initialCondition = initialCondition[0];
    //         }
    //         else {
    //             _initialCondition = initialCondition;
    //         }
    //         _return = rk4Single(__assign(__assign({}, args), { initialCondition: _initialCondition }));
    //     }
    //     return _return;
    //     // }
    //     // throw StepSizeDivisibilityError;
    // }
    // throw UndependentVariableError;
}

function rk4Single (f, n, h, j, t_start) {
    /*
    * f - function to call
    * n - number of steps
    * h - step size
    * j - initial condition - must be number
    * t_start = time at initial conditions
     */
    var t = t_start;
    var x = new Array(n+1);  // x values
    var y = new Array(n+1)   // y values
    x[0] = t; // t start
    y[0] = j;
    var i = 0;
    var k1, k2, k3, k4;
    while (i < n) {
        k1 = f(t, y[i]);
        k2 = f(t + (.5 * h), y[i] + (.5 * h * k1));
        k3 = f(t + (.5 * h), y[i] + (.5 * h * k2));
        k4 = f(t + h, y[i] + (h * k3));
        y[i + 1] = y[i] + (h * (k1 + (2 * k2) + (2 * k3) + k4) / 6);
        t += h;
        i++;
        x[i] = t;
    }
    return {xVals: x, yVals: y};
}


function rk4Multi(f, n, h, j, t_start) {
    /*
    * f - function to call
    * n - number of steps
    * h - step size
    * j - initial condition vector
    * t_start = time at initial conditions
    */
    var m = j.length;
    var t = t_start;
    var k1, k2, k3, k4;
    var yLast = j;

    var x = new Array(n+1);  // x values
    x[0] = t; // t start

    var result = new Array(m);
    for (let k = 0; k < m; k++) {
        result[k] = new Array(n+1); // n + 1 points
        result[k][0] = yLast[k];
    }
    for (let i = 1; i <= n; i++) {
        k1 = f(t, yLast);
        k2 = f(t + (.5 * h), _vecAdd2Sec(yLast, _scalarMult(.5 * h, k1, m), m));
        k3 = f(t + (.5 * h), _vecAdd2Sec(yLast, _scalarMult(.5 * h, k2, m), m));
        k4 = f(t + h, _vecAdd2Sec(yLast, _scalarMult(h, k3, m), m));
        for (let k = 0; k < m; k++) {
            yLast[k] += h * (k1[k] + (2 * k2[k]) + (2 * k3[k]) + k4[k]) / 6;
            result[k][i] = yLast[k];
        }
        t += h;
        x[i] = t;
    }

    return {xVals: x, yVals: result};
}