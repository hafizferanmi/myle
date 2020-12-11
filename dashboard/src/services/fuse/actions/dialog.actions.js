import * as actionTypes from '../actionTypes';


export function closeDialog()
{
    return {
        type: actionTypes.CLOSE_DIALOG
    }
}

export function openDialog(options)
{
    return {
        type: actionTypes.OPEN_DIALOG,
        options
    }
}
export function closeRidesDialog()
{
    return {
        type: actionTypes.CLOSE_RIDES_DIALOG
    }
}

export function openRidesDialog(options)
{
    return {
        type: actionTypes.OPEN_RIDES_DIALOG,
        options
    }
}

