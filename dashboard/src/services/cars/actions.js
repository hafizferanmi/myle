import * as actionTypes from './actionTypes';
import HttpService from '../HttpService';
import {actions} from "../index";


const search_options = {
    search :  '',
    sort_by : 'driver_cars.created_at',
    sort_by_type : true
};


export function getCars() {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_CARS_REQUEST});
            HttpService.get('/cars', search_options, (response) => {
                console.log("getCars response - ", response);

                dispatch({
                    type        : actionTypes.GET_CARS_SUCCESS,
                    cars        : response.cars
                });
            }, (error) => {
                dispatch({type: actionTypes.GET_CARS_FAIL });
            });
        }catch (error) {
            dispatch({type : actionTypes.GET_CARS_ERROR });
        }
    }
}

export function removeCar(car_id) {
    return function (dispatch, getState) {
        try {
            return new Promise((resolve, reject) => {
                dispatch({type: actionTypes.REMOVE_CAR_REQUEST});
                HttpService.post('/cars/'+car_id+'/remove', {}, (response) => {
                    dispatch({
                        type        : actionTypes.REMOVE_CAR_SUCCESS,
                        document_id : car_id
                    });
                    dispatch(actions.NotificationsActions.alert('Great!', 'You have removed car', 'info'))
                    return resolve();
                }, (error) => {
                    dispatch({type: actionTypes.REMOVE_CAR_FAIL });
                    dispatch(actions.NotificationsActions.alert('Please try again!', error.error))
                    return reject();
                });
            });
        }catch (error) {
            dispatch({type : actionTypes.REMOVE_CAR_ERROR });
        }
    }
}

export function activateCar(car_id) {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.ACTIVATE_CAR_REQUEST});
            HttpService.post('/cars/'+car_id+'/activate', {}, (response) => {
                dispatch({
                    type        : actionTypes.ACTIVATE_CAR_SUCCESS,
                    document_id : car_id
                });
                dispatch(actions.NotificationsActions.alert('Great!', 'You have activated car'))
            }, (error) => {
                dispatch({type: actionTypes.ACTIVATE_CAR_FAIL });
                dispatch(actions.NotificationsActions.alert('Please try again!', error.error))
            });
        }catch (error) {
            dispatch({type : actionTypes.ACTIVATE_CAR_ERROR });
        }
    }
}


export function updateCar(car) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            try {
                dispatch({type: actionTypes.UPDATE_CAR_REQUEST});
                HttpService.post(`/cars/${car.id}`, car, (response) => {
                    dispatch({
                        type   : actionTypes.UPDATE_CAR_SUCCESS,
                        car    : response.car
                    });
                    dispatch(actions.NotificationsActions.alert('Great!', 'You have updated car', 'success'));
                    return resolve();
                }, (error) => {
                    dispatch({type: actionTypes.UPDATE_CAR_FAIL });
                    dispatch(actions.NotificationsActions.alert('Please try again!', error.error));
                    return reject();
                });
            }catch (error) {
                dispatch({type : actionTypes.UPDATE_CAR_ERROR });
                return reject();
            }
        });
    }
}


export function retrieveCar(car_id) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            try {
                dispatch({type: actionTypes.RETRIEVE_CAR_REQUEST});
                HttpService.get(`/cars/${car_id}`, {}, (response) => {
                    dispatch({
                        type   : actionTypes.RETRIEVE_CAR_SUCCESS,
                        car    : response.car
                    });
                    return resolve(response.car);
                }, (error) => {
                    dispatch({type: actionTypes.RETRIEVE_CAR_FAIL });
                    return reject();
                });
            }catch (error) {
                dispatch({type : actionTypes.REMOVE_CAR_ERROR });
                return reject();
            }
        });
    }
}
