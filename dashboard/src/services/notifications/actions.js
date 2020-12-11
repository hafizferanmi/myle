import * as actionTypes from './actionTypes';

export function alert(title, body, variant='error') {
    return function (dispatch, getState) {
        dispatch({type: actionTypes.SHOW_NOTIFICATION, title: title, body: body, variant:variant})
    }
}

export function clearNotification(notification) {
    return function (dispatch, getState) {
        dispatch({type: actionTypes.CLEAR_NOTIFICATION, notification })
    }
}
