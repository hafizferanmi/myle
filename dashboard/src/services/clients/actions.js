import * as actionTypes from './actionTypes';
import HttpService from '../HttpService';
import history from '../../history';

const search_options_all = {
    page : 1,
    per_page : 15000,
    search :  '',
    sort_by : 'users.created_at',
    sort_by_type : true,
    client: null,
};

export function getClients(search_options=search_options_all) {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_CLIENTS_REQUEST, page: search_options.page});
            HttpService.get('/riders', search_options, (response) => {
                dispatch({
                    type: actionTypes.GET_CLIENTS_SUCCESS,
                    clients: response.riders.data,
                    total: response.riders.total
                });
            }, (error) => {
                dispatch({type: actionTypes.GET_CLIENTS_FAIL });
            });
        }catch (error) {
            dispatch({type : actionTypes.GET_CLIENTS_ERROR });
        }
    }
}

export function searchRiders(search_options=search_options_all) {
    return function (dispatch, getState) {
        try {
            let options = {
                ...search_options_all,
                ...search_options
            };
            dispatch({type: actionTypes.SEARCH_RIDERS_REQUEST});
            HttpService.get('/riders', options, (response) => {
                dispatch({
                    type: actionTypes.SEARCH_RIDERS_SUCCESS,
                    clients: response.riders.data
                });
            }, (error) => {
                dispatch({type: actionTypes.SEARCH_RIDERS_FAIL });
            });
        }catch (error) {
            dispatch({type : actionTypes.SEARCH_RIDERS_ERROR });
        }
    }
}

export function retrieveClientId(id) {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_CLIENT_REQUEST});
            HttpService.get('/clients/' + id, {}, (response) => {
                //console.log(response);
                dispatch({
                    type: actionTypes.GET_CLIENT_SUCCESS,
                    client: response
                });
            }, (error) => {
                dispatch({type: actionTypes.GET_CLIENT_FAIL });
            });
        }catch (error) {
            console.log(error);
            dispatch({type : actionTypes.GET_CLIENT_ERROR });
        }
    }
}
export function viewClient(id) {
    console.log("viewClient");

    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.CLEAR_CLIENT});
            if (window.location.pathname !== `/client/${id}`) {
                history.push({
                    pathname: `/client/${id}`
                });
            }
        } catch (e) {

        }
    }
}


export function retrieveClient(id) {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_CLIENT_REQUEST});
            HttpService.get('/riders/' + id, {}, (response) => {
                console.log(response);
                dispatch({
                    type: actionTypes.GET_CLIENT_SUCCESS,
                    client: response.rider
                });
                if(window.location.pathname !== `/client/${id}`){
                    history.push({
                        pathname: `/client/${id}`
                    });
                }
            }, (error) => {
                dispatch({type: actionTypes.GET_CLIENT_FAIL });
            });
        }catch (error) {
            console.log(error);
            dispatch({type : actionTypes.GET_CLIENT_ERROR });
        }
    }
}

export function updateClient(client) {
    return function (dispatch, getState) {
        try {
            return new Promise((resolve, reject) => {
                dispatch({type: actionTypes.UPDATE_CLIENT_REQUEST});
                HttpService.post('/riders/' + client.id, client, (response) => {
                    dispatch({
                        type     : actionTypes.UPDATE_CLIENT_SUCCESS,
                        client   : response.rider
                    });
                    dispatch(retrieveClient(response.rider.id));
                    return resolve();
                }, (error) => {
                    dispatch({type: actionTypes.UPDATE_CLIENT_FAIL });
                    return reject();
                });
            });
        }catch (error) {
            dispatch({type : actionTypes.UPDATE_CLIENT_ERROR });
        }
    }
}

export function updateFilter(key, value) {
    return function (dispatch, getState) {
        dispatch({type: actionTypes.FILTER, key: key, value: value});
    }
}
