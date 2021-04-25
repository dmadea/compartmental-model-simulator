// ---------------------------------------------------------------------
// from https://github.com/imiRemy/RK45js
// Sample use of the RK45js code.  In this case solving an ODE (Ordinary
// Differential Equation) of the form:
//
//                  dy/dt = y - t^2 + 1; y(0) = 0.5
//
// Find the value of y(t) when t=2.
//
// Note: in the code you will not see a reference to a variable 'y'.
//       Rather, you will see a reference to X0.  The solver uses
//       generalized coordinates (x0, x1, x2, ..., xN) rather than
//       referring to 'x', 'y', 'z', etc.
// ---------------------------------------------------------------------

var rk45 = require( "./rk45.js" );

// ------------------------------------------
// Set up equation(s) and initial conditions.
// ------------------------------------------

// var diffEqX0 = function( time, x ) { return (x[0]-time*time+1); }
// var diffEqX0 = function( time, x ) { return [x[0]-time*time+1]; }
// var diffEqX0 = function( time, x ) { return [-x[0]]; }

let k1 = 10;
let k2 = 0.2;

var diffEqX0 = function( time, x ) { 
    return [-k1 * x[0], k1 * x[0] - k2 * x[1], k2 * x[1]]; 
}



var initCoord = [ 1, 0, 0 ];

// -------------------------
// Create a new RK45 solver.
// -------------------------

var foo = new rk45.System();

foo.setStart( 0.0 );        // Initial start time, t=0.
foo.setStop( 100.0 );         // Time at which we want a solution, t=2.
foo.setInitX( initCoord );  // y(0) -- value of y when t=0.
foo.setH(0.1);
foo.setFn( diffEqX0 );    // Differential equation we're solving.

// ---------------------------------------------------------
// Call the solver function: foo.solve().
// Bracket with calls hrtime calls to see how long it takes.
// ---------------------------------------------------------

var hrstart = process.hrtime();
foo.solve();
var hrend = process.hrtime(hrstart);

// ---------------------------------------
// Check status of result.  Should be o.k.
// ---------------------------------------

var status = foo.getStatus();

console.log("status: \n\tsuccess: %s\n\tstate: %s\n\tmessage: %s", status.success, status.state, status.message);
console.log(foo.result.xVals);
console.log(foo.result.yVals);

// -------------
// Print result.
// -------------

console.log("result: " + foo.newX);
console.log("Computed in %d iterations taking %ds %dms", foo.count, hrend[0], hrend[1]/1000000);