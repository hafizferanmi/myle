import * as actionTypes from "../actionTypes";


export function navbarToggleFolded()
{
    return {
        type: actionTypes.TOGGLE_FOLDED_NAVBAR
    }
}

export function navbarOpenFolded()
{
    return {
        type: actionTypes.OPEN_FOLDED_NAVBAR
    }
}

export function navbarCloseFolded()
{
    return {
        type: actionTypes.CLOSE_FOLDED_NAVBAR
    }
}

export function navbarToggleMobile()
{
    return {
        type: actionTypes.TOGGLE_MOBILE_NAVBAR
    }
}

export function navbarOpenMobile()
{
    return {
        type: actionTypes.OPEN_MOBILE_NAVBAR
    }
}

export function navbarCloseMobile()
{
    return {
        type: actionTypes.CLOSE_MOBILE_NAVBAR
    }
}

