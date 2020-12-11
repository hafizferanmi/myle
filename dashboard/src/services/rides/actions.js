import * as actionTypes from './actionTypes';
import HttpService from '../HttpService';
import {actions} from "../index";
import moment from "moment-timezone";
export const FILTERS_STORAGE_KEY = 'rides.filters';
export const RIDE_OPTIONS_STORAGE_KEY = 'ride.options';

export function getRides() {
    return function (dispatch, getState) {
        try {
            let state = getState();
            let search_options = state.rides.search_options;
            dispatch({type: actionTypes.GET_RIDES_REQUEST, page: search_options.page});
            HttpService.get('/rides', {
                ...search_options,
                from_datetime : search_options.range > 0 ? moment.utc().subtract( search_options.range, 'minutes').format('YYYY-MM-DD HH:mm:ss') : '',
                to_datetime   : search_options.range > 0 ? moment.utc().add(search_options.range,'minutes').format('YYYY-MM-DD HH:mm:ss') : ''
            }, (response) => {
                dispatch({
                    type: actionTypes.GET_RIDES_SUCCESS,
                    rides: response.rides.data,
                    total: response.rides.total
                });
            }, (error) => {
                dispatch({type: actionTypes.GET_RIDES_FAIL });
            });

        }catch (error) {
            dispatch({type : actionTypes.GET_RIDES_ERROR });
        }
    }
}

export function retrieveRide(ride) {
    return function (dispatch, getState) {
            return new Promise((resolve, reject) => {
                try {
                    let ride_processing_key = Math.random();
                    dispatch({ type: actionTypes.GET_RIDE_REQUEST, ride: ride, ride_processing_key: ride_processing_key});
                    let state = getState();
                    let search_options = state.rides.ride_search_options;
                    HttpService.get('/rides/' + ride.id, search_options, (response) => {
                        dispatch({ type: actionTypes.GET_RIDE_SUCCESS, ride: response.ride, ride_processing_key: ride_processing_key});
                        return resolve();
                    }, (error) => {
                        console.log(error);
                        dispatch({ type: actionTypes.GET_RIDE_REQUEST});
                        return reject();
                    })
                }catch (error) {
                    console.log(error);
                    // dispatch({type : actionTypes.GET_RIDES_ERROR });
                    return reject();
                }
            })


    }
}


export function retrieveRideLocation(ride_id) {
    return function (dispatch, getState) {
        try {
            dispatch({ type: actionTypes.RETRIEVE_RIDE_LOCATION_REQUEST, ride_id: ride_id});
            HttpService.get('/rides/' + ride_id+'/location', {}, (response) => {
                dispatch({ type: actionTypes.RETRIEVE_RIDE_LOCATION_SUCCESS, driver: response.driver });
            }, (error) => {
                dispatch({ type: actionTypes.RETRIEVE_RIDE_LOCATION_FAIL});
            })
        }catch (error) {
            dispatch({type : actionTypes.RETRIEVE_RIDE_LOCATION_ERROR });
        }
    }
}

export function clearRide() {
    return function (dispatch, getState) {
        dispatch({ type: actionTypes.CLEAR_RIDE});
    }
}


export function getEstimates(data) {
    return function (dispatch, getState) {
        try {
            let random_id = Math.random();
            dispatch({type: actionTypes.GET_ESTIMATES_REQUEST, key: random_id});
            HttpService.post('/estimates/price', data, (response) => {
                dispatch({
                    type: actionTypes.GET_ESTIMATES_SUCCESS,
                    estimates: response.estimates,
                    stats: response.stats,
                    groups: response.groups,
                    key: random_id
                });
            }, (error) => {
                dispatch({type: actionTypes.GET_ESTIMATES_FAIL });
            });

        }catch (error) {
            dispatch({type : actionTypes.GET_ESTIMATES_ERROR });
        }
    }
}
export function eta(ride_type_id, lat, lon) {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_ETA_REQUEST});
            HttpService.get('/estimates/eta', {
                ride_type_id, lat, lon
            }, (response) => {
                dispatch({
                    type    : actionTypes.GET_ETA_SUCCESS,
                    drivers : response.drivers,
                    eta     : response.eta
                });
            }, (error) => {
                dispatch({type: actionTypes.GET_ETA_FAIL });
            });

        }catch (error) {
            dispatch({type : actionTypes.GET_ETA_ERROR });
        }
    }
}
export function updateRide(ride_id, options) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            try {
                dispatch({ type: actionTypes.UPDATE_RIDE_REQUEST});
                HttpService.post('/rides/'+ride_id, options, (response) => {
                    dispatch({ type: actionTypes.UPDATE_RIDE_SUCCESS, ride: rideToListFormat(response.ride), full_ride: response.ride });
                    return resolve();
                }, (error) => {
                    dispatch(actions.NotificationsActions.alert('Please try again!', error.error));
                    dispatch({ type: actionTypes.UPDATE_RIDE_FAIL});
                    return reject();
                });
            } catch (error) {
                dispatch({ type: actionTypes.UPDATE_RIDE_ERROR});
                return reject();
            }
        });
    }
}

export function createRequest(options) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            try {
                dispatch({type: actionTypes.CREATE_RIDE_REQUEST});
                HttpService.post('/rides', options, (response) => {
                    dispatch({
                        type: actionTypes.CREATE_RIDE_SUCCESS,
                    });
                    dispatch(actions.NotificationsActions.alert('Great', 'You have added an ride!'));
                    return resolve();
                }, (error) => {
                    dispatch({type: actionTypes.CREATE_RIDE_FAIL });
                    return reject();
                });
            }catch (error) {
                dispatch({type : actionTypes.CREATE_RIDE_ERROR });
                return reject();
            }
        });
    }
}

export function estimate(data) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            try {
                dispatch({type: actionTypes.ESTIMATE_REQUEST});
                HttpService.post('/estimates', data, (response) => {
                    dispatch({
                        type: actionTypes.ESTIMATE_SUCCESS,
                        estimate: response.estimate
                    });
                    return resolve();
                }, (error) => {
                    dispatch({type: actionTypes.ESTIMATE_FAIL });
                    return reject();
                });
            }catch (error) {
                dispatch({type : actionTypes.ESTIMATE_ERROR });
                return reject();
            }
        });
    }
}
export function resetEstimate() {
    return function (dispatch, getState) {
        dispatch({type: actionTypes.RESET_ESTIMATE});
    }
}

export function updateFilters(filter) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch({ type: actionTypes.UPDATE_FILTERS, filter: filter });
            dispatch(getRides());
            return resolve()
        })
    }
}

export function updateRideFilters(filter) {
    return function (dispatch, getState) {
        return new Promise((resolve, reject) => {
            dispatch({ type: actionTypes.UPDATE_RIDE_OPTIONS, filter: filter });
            return resolve()
        })
    }
}

export function getPlaces(input) {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_PLACES_REQUEST});
            HttpService.get('/places', {
                address: input,
                lat: 40.626824,
                lon: -73.975615
            }, (response) => {
                dispatch({type: actionTypes.GET_PLACES_SUCCESS, places: response.places});
            }, (error) => {
                dispatch({type: actionTypes.GET_PLACES_REQUEST, places: []});
            });
        }catch (error) {
            dispatch({type : actionTypes.GET_PLACES_ERROR });
        }
    }
}

export function rideToListFormat(ride) {
    return {
        id           : ride.id,
        reference_id : ride.reference_id,
        ride_type    : ride.ride_type.ride_type,
        distance     : ride.distance,
        driver_net   : ride.driver_net,
        amount       : ride.amount,
        confirmed    : ride.confirmed,
        admin_id     : ride.admin_id,
        pickup_note  : ride.pickup_note,
        note         : ride.note,
        status       : ride.status,
        date         : ride.pickup_at,
        pickup_at    : ride.pickup_at,
        start_at     : ride.pickup_at,
        dropoff_at   : ride.dropoff_at,

        display_name   : ride.ride_type.display_name,
        start_address  : ride.start_address,
        pickup_address : ride.pickup_address,
        destination_address : ride.destination_address,
        dropoff_address : ride.dropoff_address,
        brokered : ride.brokered,

        first_name           : ride.user.first_name,
        phone_number         : ride.user.phone_number,
        selfie_thumbnail_url : ride.user.selfie_thumbnail_url,

        driver_id            : ride.driver ? ride.driver.id : null,
        driver_phone_number  : ride.driver ? ride.driver.phone_number : null,
        driver_first_name    : ride.driver ? ride.driver.first_name : null,
        driver_last_name     : ride.driver ? ride.driver.last_name : null,
        driver_selfie_thumbnail_url : ride.driver ? ride.driver.selfie_thumbnail_url : null,
        lat                 : ride.driver ? ride.driver.lat : null,
        lon                 : ride.driver ? ride.driver.lon : null,
        heading             : ride.driver ? ride.driver.heading : null,
        eta                 : ride.eta ? ride.eta: 0,

        car_id    : ride.car ? ride.car.id     : null,
        title     : ride.car ? ride.car.title  : null,
        image     : ride.car ? ride.car.marker : null,
        car_reference_id : ride.car ? ride.car.reference_id  : null,
        car_color : ride.car ? ride.car.color  : null
    }
}



export function validateRide(ride, filters, rides) {
    // check if ride exists in the list
    for(let i = 0; i < rides.length; i++){
        if(rides[i].id === ride.id){
            return true;
        }
    }

    // STATUS
    if(filters.statuses !== '' && filters.statuses !== ',' && filters.statuses !== 'all'){
        if(filters.statuses.indexOf(ride.status) === -1){
            return false;
        }
    }
    if(filters.brokered !== 'all'){
        if(filters.brokered !== ride.brokered){
            return false;
        }
    }
    if(filters.public !== ''){
        if(filters.public !== ride.public){
            return false;
        }
    }
    if(filters.search !== ''){
        let search_text = filters.search.toLowerCase();
        return (
            (ride.id&&ride.id.toString().indexOf(search_text)>=0) ||
            (ride.user&&ride.user.first_name.toString().toLowerCase().indexOf(search_text)>=0) ||
            (ride.user&&ride.user.phone_number.toString().indexOf(search_text)>=0) ||
            (ride.driver&&ride.driver.first_name.toString().toLowerCase().indexOf(search_text)>=0) ||
            (ride.driver&&ride.driver.last_name&&ride.driver.last_name.toString().toLowerCase().indexOf(search_text)>=0) ||
            (ride.car&&ride.car.reference_id.toString().indexOf(search_text)>=0) ||
            (ride.start_address&&ride.start_address.toString().toLowerCase().indexOf(search_text)>=0) ||
            (ride.destination_address&&ride.destination_address.toString().toLowerCase().indexOf(search_text)>=0)
        );

    }

    if(filters.from_datetime !== '') {
        if (filters.from_datetime > ride.pickup_at) {
            return false;
        }
    }

    if(filters.to_datetime !== '') {
        if (filters.to_datetime < ride.pickup_at) {
            return false;
        }
    }

    return true;
}
