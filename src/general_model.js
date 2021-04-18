
import { rungeKutta4 } from './rk.js';

// Warn if overriding existing method
if(Array.prototype.equals)
    console.warn("Overriding existing Array.prototype.equals. Possible causes: New API defines the method, there's a framework conflict or you've got double inclusions in your code.");

// attach the .equals method to Array's prototype to call it on any array
Array.prototype.equals = function (array) {
    // if the other array is a falsy value, return
    if (!array)
        return false;

    // compare lengths - can save a lot of time 
    if (this.length !== array.length)
        return false;

    for (var i = 0, l=this.length; i < l; i++) {
        // Check if we have nested arrays
        if (this[i] instanceof Array && array[i] instanceof Array) {
            // recurse into the nested arrays
            if (!this[i].equals(array[i]))
                return false;       
        }           
        else if (this[i] !== array[i]) { 
            // Warning - two different object instances will never be equal: {x:20} != {x:20}
            return false;   
        }           
    }       
    return true;
}
// Hide method from for-in loops
Object.defineProperty(Array.prototype, "equals", {enumerable: false});

export class GeneralModel {

    constructor () {
        this.initial_conditions = {};
        this.elem_reactions = [];  // list of dictionaries of elementary reactions
        this.scheme = "";
        this.func = null;  // function that returns dc_dt for current c and t for built model
        this.diffEquations = '';  //variable that stores diff. equation text to be displayed
        this.diffEquationsFRates = '';  //only forward rates diff eqs.
    }

    addElementaryReaction(from_comp=['A', 'A'], to_comp=['B', 'C'], forward_rate=1, backward_rate=0) {
        let reaction = {
            from_comp: from_comp,
            to_comp: to_comp,
            forward_rate: forward_rate,
            backward_rate: backward_rate
        };

        for (let i = 0; i < this.elem_reactions.length; i++) {
            let el = this.elem_reactions[i];
            if (el.from_comp.equals(reaction.from_comp) && el.to_comp.equals(reaction.to_comp)) {
                el.forward_rate = reaction.forward_rate;
                el.backward_rate = reaction.backward_rate;
                return;
            }
        }

        this.elem_reactions.push(reaction);
    }

    getCompartments() {
        let names = [];

        this.elem_reactions.forEach(el => {
            el.from_comp.forEach(comp => {
                if (!(names.includes(comp))) names.push(comp);
            });
            el.to_comp.forEach(comp => {
                if (!(names.includes(comp))) names.push(comp);
            });
        });

        return names;
    }

    getLatexFormattedCompartments() {
        let result = [];

        for (let c of this.getCompartments()) {
            // following code makes numbers subscript and text keeps normal, all text is then 
            // enclosed in \\mathrm{}, also dots . are replaced by \\cdot

            let chars = c.split('');
            let name = '';
            let numbers = null;

            let addNumbers = function () {
                if (numbers == null) return;

                name += `_{${numbers}}`;
                numbers = null;
            }

            for (let i = 0; i < chars.length; i++) {
                if (isNaN(chars[i])) {
                    addNumbers();
                    name += chars[i];
                }
                else {
                    numbers = numbers == null ? '' : numbers;
                    numbers += chars[i];
                    if (i === chars.length - 1)
                        addNumbers();
                }
            }

            name = `\\mathrm{${name.replaceAll('.', '\\cdot ')}}`;
            
            result.push(name);
        }
        return result;
    }

    getRateNames(backwardRates=false) {

        let comps = this.getCompartments();
        let fComps = this.getLatexFormattedCompartments();
        let dict = {};

        for (let i = 0; i < comps.length + 1; i++) 
            dict[comps[i]] = fComps[i];

        let rateNames = [];
        for (let el of this.elem_reactions) {
            let fFromComps = el.from_comp.map(c => dict[c]);
            let fToComps = el.to_comp.map(c => dict[c]);

            let occursFC = GeneralModel.occurences(fFromComps);
            let occursTC = GeneralModel.occurences(fToComps);

            fFromComps = [];
            fToComps = [];

            // if there is multiple compartments, find occurences and multiply them
            for (let key in occursFC) {
                let num = occursFC[key];
                fFromComps.push(num === 1 ? key : `${num}${key}`);
            }

            for (let key in occursTC) {
                let num = occursTC[key];
                fToComps.push(num === 1 ? key : `${num}${key}`);
            }

            let fArrow = backwardRates ? '\\rightarrow' : '\\rightleftharpoons';
            let frNoColor = `k_{${fFromComps.join('+')} ${fArrow} ${fToComps.join('+')}}`;

            let fr = `{\\color{blue}${frNoColor}}`;
            let br = `{\\color{red}k_{${fFromComps.join('+')} \\leftarrow ${fToComps.join('+')}}}`;

            rateNames.push(backwardRates ? [fr, br] : frNoColor);
        }

        return rateNames;
    }

    printModel() {
        console.log(`Scheme: ${this.scheme}`);
        console.log("Initial conditions:", this.initial_conditions);

        this.elem_reactions.forEach(el => {
            console.log(`Elementary reaction: ${el.from_comp.join(' + ')} -> ${el.to_comp.join(' + ')}, forward_rate=${el.forward_rate}, backward_rate=${el.backward_rate}`);
        });
    }

    simulateModel(steps=500, range=[0, 100], useZeroBR=false) {
        let j = Object.values(this.initial_conditions);   

        let forward_rates = new Array(this.elem_reactions.length);
        let backward_rates = new Array(this.elem_reactions.length);

        for (let i = 0; i < this.elem_reactions.length; i++) {
            forward_rates[i] = this.elem_reactions[i].forward_rate;
            backward_rates[i] = useZeroBR ? 0 : this.elem_reactions[i].backward_rate;
        }

        let solution = rungeKutta4((t, c) => this.func(t, c, forward_rates, backward_rates), j, range, steps);

        return solution;
    }

    static occurences(array, dict=null, subtractOccurences=false) {
        /*
        * Makes a dictionary of unique values in array and ascribes them a number of times they occured.
        * If dict is not null, it uses this dictionary as a starting point.
        * If subtractOccurences=true, if value exists already in dict, it will decresed by one. If not, 
        * it starts at -1.
        */
        dict = dict === null ? {} : dict;

        let num = subtractOccurences ? -1 : 1;

        for (var i = 0; i < array.length; i++) {
            var value = array[i];
            dict[value] = dict[value] ? dict[value] + num : num;
        }
        return dict;
    }

    _buildDiffEq(idx_from, idx_to, includeBackwardRates=true){
        // builds latex type diff. equation for printing

        let rateNames = this.getRateNames(true);
        let compsF = this.getLatexFormattedCompartments();
        let comps_len = compsF.length;

        let posTerms = new Array(comps_len);
        let negTerms = new Array(comps_len);
        for (let i = 0; i < comps_len; i++) {
            posTerms[i] = [];
            negTerms[i] = [];
        }

        // build latex diff. equations
        for (let i = 0; i < this.elem_reactions.length; i++) {
            
            let forward_prod = rateNames[i][0];
            let backward_prod = rateNames[i][1];

            let fList = idx_from[i].map(k => `[${compsF[k]}]`);
            let bList = idx_to[i].map(k => `[${compsF[k]}]`);

            let occursF = GeneralModel.occurences(fList);
            let occursB = GeneralModel.occurences(bList);

            for (let key in occursF) {
                let num = occursF[key];
                forward_prod += num === 1 ? key : `${key}^{${num}}`;
            }

            for (let key in occursB) {
                let num = occursB[key];
                backward_prod += num === 1 ? key : `${key}^{${num}}`;
            }

            idx_from[i].forEach(k => {
                if (includeBackwardRates)
                    posTerms[k].push(backward_prod);

                negTerms[k].push(forward_prod);
            });

            idx_to[i].forEach(k => {
                posTerms[k].push(forward_prod);

                if (includeBackwardRates)
                    negTerms[k].push(backward_prod);
            });
        }

        // finish latex diff. equations

        var result = '';

        for (let i = 0; i < comps_len; i++) {
            let posOccurs = GeneralModel.occurences(posTerms[i]);
            let allOccurs = GeneralModel.occurences(negTerms[i], posOccurs, true); // subtract same occurences

            let terms = [];
            for (let key in allOccurs) {
                let num = allOccurs[key];
                if (num === 0)
                    continue;

                let sign = num > 0 ? '+' : '-';
                let numStr = Math.abs(num) === 1 ? '' : Math.abs(num);
                terms.push(`${sign}${numStr}${key}`);
            }

            result += `\\frac{\\mathrm d[${compsF[i]}]}{\\mathrm dt}&=${terms.join('')}\\\\`
        }

        return result;
    }

    buildFunc() {
        let comps = this.getCompartments();
        var comps_len = comps.length;

        let inv_dict = {};
        for (let i = 0; i < comps_len; i++)
            inv_dict[comps[i]] = i;
            
        var r = this.elem_reactions.length;
        var idx_from = [];  // arrays of arrays of indexes for each elementary reaction
        var idx_to = [];  // arrays of arrays of indexes for each elementary reaction
        var _forward_rates = [];
        var _backward_rates = [];

        for (let i = 0; i < r; i++) {
            let el = this.elem_reactions[i];
            
            let i_from = el.from_comp.map(comp => inv_dict[comp]); // list of indexes of starting materials
            let i_to = el.to_comp.map(comp => inv_dict[comp]);  // list of indexes of reaction products

            idx_from.push(i_from);
            idx_to.push(i_to);

            _forward_rates[i] = el.forward_rate;
            _backward_rates[i] = el.backward_rate;
        }

        this.diffEquations = this._buildDiffEq(idx_from, idx_to, true);
        this.diffEquationsFRates = this._buildDiffEq(idx_from, idx_to, false);

        this.func = (t, c, forward_rates=null, backward_rates=null) => {
            if (forward_rates == null)
                forward_rates = _forward_rates;
            if (backward_rates == null)
                backward_rates = _backward_rates;

            let dc_dt = new Array(comps_len).fill(0);

            for (let i = 0; i < r; i++) {

                let forward_prod = forward_rates[i];
                let backward_prod = backward_rates[i];
                
                for (let k = 0; k < idx_from[i].length; k++) {
                    forward_prod *= c[idx_from[i][k]];
                }

                for (let k = 0; k < idx_to[i].length; k++) {
                    backward_prod *= c[idx_to[i][k]];
                }

                for (let k = 0; k < idx_from[i].length; k++) {
                    dc_dt[idx_from[i][k]] += backward_prod - forward_prod; // reactants
                }

                for (let k = 0; k < idx_to[i].length; k++) {
                    dc_dt[idx_to[i][k]] += forward_prod - backward_prod; // products
                }
            }
            return dc_dt;
        };
    }

    static fromText(scheme) {
        var _model = new GeneralModel();
        _model.scheme = scheme;

        let lines = scheme.split('\n');

        lines.forEach(line => {
            line = line.split('#')[0]  // remove comments
            let white_space_filter = line.match(/[^\s]+/g);
            if (line === "" || white_space_filter === null)
                return;

            line = white_space_filter.join('')  // remove white space characters
            let processed_tokens = [];

            line.split('=').forEach(token => {
                let entries = [];

                token.split('+').forEach(entry => {

                    let regExp = /(\d)([\w\d\.]+)|([\w\d\.]+)/g;
                    let match = regExp.exec(entry);  // get groups

                    let contains_number = typeof match[3] == 'undefined';

                    let number = contains_number ? parseInt(match[1]) : 1;
                    let name = contains_number ? match[2] : match[3];

                    if (number < 1) number = 1;
                    
                    for (let i = 0; i < number; i++) entries.push(name);
                });
                processed_tokens.push(entries);
            });

            for (let i = 0; i < processed_tokens.length - 1; i++) {
                _model.addElementaryReaction(processed_tokens[i], processed_tokens[i+1]);
            }

        });

        let comps = _model.getCompartments();
        for (let i = 0; i < comps.length; i++)
            _model.initial_conditions[comps[i]] = i === 0 ? 1 : 0;

        return _model;
    }
}
