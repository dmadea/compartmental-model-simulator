import * as type from '../types';


export const sliderValueChanged = (type, index, value) => {
    return {
        type: type,
        index,
        value
    }
}

export const sliderVarsChanged = (type, index, min, max, log) => {
    return {
        type: type,
        index,
        min,
        max, 
        log
    }
}

export const cbNonZeroCheckedChanged = () => {
    return {
        type: type.CB_NON_ZERO_CHECKED_CHANGED,
    }
}


export const setSchemeText = (text) => {
    return {
        type: type.SET_SCHEME_TEXT,
        text
    }
}

export const setSchemeAndcbNonZero = (text, cbNonZero) => {
    return {
        type: type.SET_SCHEME_AND_CB_NON_ZERO,
        text,
        cbNonZero
    }
}

export const setGeneralModel = (model, initConds, forwardRates, backwardRates) => {
    return {
        type: type.SET_GENERAL_MODEL,
        model,
        initConds,
        forwardRates,
        backwardRates
    }
}

export const toggleLogX = () => {
    return {
        type: type.TOGGLE_LOG_X,
    }
}

export const toggleLogY = () => {
    return {
        type: type.TOGGLE_LOG_Y,
    }
}
