import * as type from '../types';

export const setGraphData = (solution, compNames) => {
    return {
        type: type.SET_GRAPH_DATA,
        solution,
        compNames
    }
}