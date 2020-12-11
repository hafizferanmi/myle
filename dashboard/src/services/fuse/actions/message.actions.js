import * as actionTypes from '../actionTypes';


export function hideMessage()
{
    return {
        type: actionTypes.HIDE_MESSAGE
    }
}

export function showMessage(options)
{
    return {
        type: actionTypes.SHOW_MESSAGE,
        options
    }
}

