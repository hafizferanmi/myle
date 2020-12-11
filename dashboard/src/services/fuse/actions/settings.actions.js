import * as actionTypes from '../actionTypes';


export function setSettings(value)
{
    return {
        type: actionTypes.SET_SETTINGS,
        value
    }
}

export function setDefaultSettings(value)
{
    return {
        type: actionTypes.SET_DEFAULT_SETTINGS,
        value
    }
}

export function setInitialSettings()
{
    return {
        type: actionTypes.SET_INITIAL_SETTINGS
    }
}

export function resetSettings(value)
{
    return {
        type: actionTypes.RESET_DEFAULT_SETTINGS,
        value
    }
}
