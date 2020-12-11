import * as actionTypes from './actionTypes';
import HttpService from '../HttpService';
import {actions} from "../index";

export function retrieve() {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_SETTINGS_REQUEST});
            HttpService.get('/settings', {} , (response) => {
                dispatch({
                    type        : actionTypes.GET_SETTINGS_SUCCESS,
                    payment_methods    : response.payment_methods,
                    // company_facilities : response.company_facilities,
                    // balance            : response.balance,
                    // transactions       : response.transactions,
                    // transactions_chart : response.transactions_chart,
                    users              : response.users
                });
            }, (error) => {
                dispatch({type: actionTypes.GET_SETTINGS_FAIL });
            });
        }catch (error) {
            dispatch({type : actionTypes.GET_SETTINGS_ERROR });
        }
    }
}


export function createUser(options) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            try {
                dispatch({type: actionTypes.CREATE_USER_REQUEST});
                HttpService.post('/users', options, (response) => {
                    dispatch({
                        type: actionTypes.CREATE_USER_SUCCESS,
                        user: response.user
                    });
                    dispatch(actions.NotificationsActions.alert('Great', 'You have added an admin!'));
                    return resolve();
                }, (error) => {
                    dispatch({type: actionTypes.CREATE_USER_FAIL });
                    return reject();
                });
            }catch (error) {
                dispatch({type : actionTypes.CREATE_USER_ERROR });
                return reject();
            }
        });
    }
}

export function updateUser(id, options) {
    return function (dispatch, getState) {
        try {
            return new Promise((resolve, reject) => {
                dispatch({type: actionTypes.UPDATE_USER_REQUEST});
                HttpService.post(`/users/${id}`, options, (response) => {
                    dispatch({
                        type: actionTypes.UPDATE_USER_SUCCESS,
                        user: response.user
                    });
                    return resolve();
                }, (error) => {
                    dispatch({type: actionTypes.UPDATE_USER_FAIL });
                    return reject();
                });
            });
        }catch (error) {
            dispatch({type : actionTypes.UPDATE_USER_ERROR });
        }
    }
}


export function getServiceFees() {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_SERVICE_FEES_REQUEST});
            HttpService.get('/settings/service_fees', {
                search :  '',
                sort_by : 'created_at',
                sort_by_type : true
            } , (response) => {
                dispatch({
                    type         : actionTypes.GET_SERVICE_FEES_SUCCESS,
                    service_fees : response.service_fees
                });
            }, (error) => {
                dispatch({type: actionTypes.GET_SERVICE_FEES_FAIL });
            });
        }catch (error) {
            dispatch({type : actionTypes.GET_SERVICE_FEES_ERROR });
        }
    }
}

export function updateFilter(key, value) {
    return function (dispatch, getState) {
        dispatch({type: actionTypes.UPDATE_FILTERS, key: key, value: value});
    }
}
