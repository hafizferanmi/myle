import * as actionTypes from './actionTypes';

export function setPickupMarker(value) {
    return function (dispatch, getState) {
        dispatch({ type: actionTypes.SET_PICK_UP_MARKER, value:value});
    }
}
export function setDropOffMarker(value) {
    return function (dispatch, getState) {
        dispatch({ type: actionTypes.SET_DROP_OFF_MARKER, value: value});
    }
}
export function cancelSetMarker() {
    return function (dispatch, getState) {
        dispatch({ type: actionTypes.CANCEL_SET_MARKER });
    }
}

