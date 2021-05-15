import * as type from '../types';


const dataTemplate = {
    x: [],
    y: [],
    mode: 'lines',
    type: 'scatter',
    name: ''
};

const initState = {
    data: [
        { ...dataTemplate }  // here are data for plots
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
};

export default function graph (state = initState, action) {
    switch (action.type) {
        case type.SET_GRAPH_DATA:

            const data = new Array(action.compNames.length);

            for (let i = 0; i < action.compNames.length; i++) {
                data[i] = { ...dataTemplate }
                data[i].x = action.solution.xVals;
                data[i].y = action.solution.yVals[i];
                data[i].name = `${action.compNames[i]}`;
            }

            return { ...state, revision: state.revision + 1, data: data };

        // const newState = { ...state, revision: state.revision + 1 };

        // let diff = action.compNames.length - state.data.length;  // difference in number of current compartments and from new model
        // if (diff > 0) {
        //     for (let i = 0; i < diff; i++)
        //         newState.data.push({ ...dataTemplate });
        // } else if (diff < 0) {
        //     for (let i = 0; i < -diff; i++)
        //         newState.data.pop();
        // }

        // return newState

        default:
            return state
    }
}
