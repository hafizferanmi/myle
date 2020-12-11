import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';
import * as actions from './actions';

const initialState = Immutable({
    search_options : {
        page: 1,
        per_page: 75,
        search: '',
        sort_by: 'rides.pickup_at',
        sort_by_type: false,
        ride: null,
        statuses: '',
        admin_id: '',
        all_rides: false,
        public: '',
        brokered: 'all',
        range: 120,
        from_datetime: '',
        to_datetime: '',
        driver_company_id: 'all'
    },
    ride_search_options: {
        retrieve_location_states: false
    },
    all_rides: [],
    rides: [],
    total: 0,
    processing: true,
    ride_processing: false,
    ride_processing_key: null,
    ride: null,
    driver_location: {
        heading: 0,
        lat: 0,
        lon: 0
    },
    get_estimates_key: 0,
    stats: {},
    groups: [],
    location_states: [],
    processing_estimates: false,
    estimate: null,
    estimates: [],
    create_ride_processing : false,
    update_ride_processing : false,
    eta: {
        drivers: []
    },
    places: []
});

let sort_alg = (a, b) => new Date(a.pickup_at.split('/').reverse()).getTime() - new Date(b.pickup_at.split('/').reverse()).getTime();

export default function (state=initialState, {type, ...action}) {

    switch(type) {
        case actionTypes.GET_RIDES_REQUEST:
            return state.merge({
                processing   : true,
                page         : action['page'],
            });
        case actionTypes.GET_RIDES_SUCCESS:
            return state.merge({
                processing : false,
                rides      : action.rides,
                all_rides  : action.rides,
                total      : action.total
            });
        case actionTypes.GET_RIDES_FAIL:
            return state.merge({
                processing   : false
            });
        case actionTypes.GET_RIDES_ERROR:
            return state.merge({
                processing   : false
            });

        /** ride **/
        case actionTypes.GET_RIDE_REQUEST:
            return state.merge({
                ride_processing   : true,
                ride              : {
                    ...state.ride,
                    ...action.ride,
                    events: []
                },
                ride_processing_key: action.ride_processing_key
            });
        case actionTypes.GET_RIDE_SUCCESS:
            if(action.ride_processing_key === state.ride_processing_key) {
                return state.merge({
                    ride_processing   : false,
                    ride              : {
                        ...state.ride,
                        ...action.ride
                    },
                    driver_location: action.ride.driver ? {
                        lat     : action.ride.driver.lat,
                        lon     : action.ride.driver.lon,
                        heading : action.ride.driver.heading
                    } : state.driver_location,
                    location_states   : action.location_states
                });
            }else{
                return state;
            }
        case actionTypes.GET_RIDE_FAIL:
            return state.merge({
                ride_processing   : false
            });
        case actionTypes.GET_RIDE_ERROR:
            return state.merge({
                ride_processing   : false
            });
        case actionTypes.CLEAR_RIDE:
            return state.merge({
                processing        : false,
                ride              : null,
                location_states   : []
            });


// RETRIEVE RIDE LOCATION
        case actionTypes.RETRIEVE_RIDE_LOCATION_REQUEST:
            return state.merge({
            });
        case actionTypes.RETRIEVE_RIDE_LOCATION_SUCCESS:
            return state.merge({
                driver_location: action.driver ? {
                    lat     : action.driver.lat,
                    lon     : action.driver.lon,
                    heading : action.driver.heading
                } : state.driver_location
            });
        case actionTypes.RETRIEVE_RIDE_LOCATION_FAIL:
            return state.merge({
            });
        case actionTypes.RETRIEVE_RIDE_LOCATION_ERROR:
            return state.merge({
            });

        /** UPDATE RIDE **/
        case actionTypes.UPDATE_RIDE_REQUEST:
            return state.merge({
                update_ride_processing   : true
            });
        case actionTypes.UPDATE_RIDE_SUCCESS:
            return state.merge({
                ride      : {
                    ...state.ride,
                    ...action.full_ride
                },
                rides     : state.rides.map(ride => ride.id === action.ride.id ? action.ride : ride),
                all_rides : state.all_rides.map(ride => ride.id === action.ride.id ? action.ride : ride),
                update_ride_processing   : false
            });
        case actionTypes.UPDATE_RIDE_FAIL:
            return state.merge({
                update_ride_processing   : false
            });
        case actionTypes.UPDATE_RIDE_ERROR:
            return state.merge({
                update_ride_processing   : false
            });

        /** CREATE RIDE **/
        case actionTypes.CREATE_RIDE_REQUEST:
            return state.merge({
                create_ride_processing   : true
            });
        case actionTypes.CREATE_RIDE_SUCCESS:
            return state.merge({
                create_ride_processing : false,
            });
        case actionTypes.CREATE_RIDE_FAIL:
            return state.merge({
                create_ride_processing   : false,
            });
        case actionTypes.CREATE_RIDE_ERROR:
            return state.merge({
                create_ride_processing   : false,
            });


        case actionTypes.SOCKET_RIDE_ASSIGNED:
            if(actions.validateRide(action.data.ride, state.search_options, state.rides) === false){
                return state;
            }
            action.ride = actions.rideToListFormat(action.data.ride);
            let index_ride_assigned = state.rides.findIndex(i => i.id === action.ride.id);
            let rides_assigned = Immutable.asMutable(state.rides);
            if(index_ride_assigned === -1){
                rides_assigned.push(action.ride);
            }else{
                rides_assigned[index_ride_assigned] = action.ride;
            }
            return state.merge({
                rides: rides_assigned.sort(sort_alg)
            });
        case actionTypes.SOCKET_RIDE_ACCEPTED:
            if(actions.validateRide(action.data.ride, state.search_options, state.rides) === false){
                return state;
            }
            action.ride = actions.rideToListFormat(action.data.ride);
            let index_ride_accepted = state.rides.findIndex(i => i.id === action.ride.id);
            let rides_accepted = Immutable.asMutable(state.rides);
            if(index_ride_accepted === -1){
                rides_accepted.push(action.ride);
            }else{
                rides_accepted[index_ride_accepted] = action.ride;
            }
            return state.merge({
                rides: rides_accepted.sort(sort_alg)
            });
        case actionTypes.SOCKET_RIDE_ARRIVING:
            if(actions.validateRide(action.data.ride, state.search_options, state.rides) === false){
                return state;
            }
            action.ride = actions.rideToListFormat(action.data.ride);
            let index_ride_arriving = state.rides.findIndex(i => i.id === action.ride.id);
            let rides_arriving = Immutable.asMutable(state.rides);
            if(index_ride_arriving === -1){
                rides_arriving.push(action.ride);
            }else{
                rides_arriving[index_ride_arriving] = action.ride;
            }
            return state.merge({
                rides: rides_arriving.sort(sort_alg)
            });
        case actionTypes.SOCKET_RIDE_REVIVED:
            if(actions.validateRide(action.data.ride, state.search_options, state.rides) === false){
                return state;
            }
            action.ride = actions.rideToListFormat(action.data.ride);
            let index_ride_revived = state.rides.findIndex(i => i.id === action.ride.id);
            let rides_revived = Immutable.asMutable(state.rides);
            if(index_ride_revived === -1){
                rides_revived.push(action.ride);
            }else{
                rides_revived[index_ride_revived] = action.ride;
            }
            return state.merge({
                rides: rides_revived.sort(sort_alg)
            });
        case actionTypes.SOCKET_RIDE_COMPLETED:
            if(actions.validateRide(action.data.ride, state.search_options, state.rides) === false){
                return state;
            }
            action.ride = actions.rideToListFormat(action.data.ride);
            let index_ride_completed = state.rides.findIndex(i => i.id === action.ride.id);
            let rides_completed = Immutable.asMutable(state.rides);
            if(index_ride_completed === -1){
                rides_completed.push(action.ride);
            }else{
                rides_completed[index_ride_completed] = action.ride;
            }
            return state.merge({
                rides: rides_completed.sort(sort_alg)
            });
        case actionTypes.SOCKET_RIDE_CANCELED:
            if(actions.validateRide(action.data.ride, state.search_options, state.rides) === false){
                return state;
            }
            action.ride = actions.rideToListFormat(action.data.ride);
            let index_ride_canceled = state.rides.findIndex(i => i.id === action.ride.id);
            let rides_canceled = Immutable.asMutable(state.rides);
            if(index_ride_canceled === -1){
                rides_canceled.push(action.ride);
            }else{
                rides_canceled[index_ride_canceled] = action.ride;
            }
            return state.merge({
                rides: rides_canceled.sort(sort_alg)
            });

        case actionTypes.SOCKET_RIDE_UPDATED:
            if(actions.validateRide(action.data.ride, state.search_options, state.rides) === false){
                return state;
            }
            action.ride = actions.rideToListFormat(action.data.ride);
            let index_ride_update = state.rides.findIndex(i => i.id === action.ride.id);
            let rides_update = Immutable.asMutable(state.rides);
            if(index_ride_update === -1){
                rides_update.push(action.ride);
            }else{
                rides_update[index_ride_update] = action.ride;
            }
            return state.merge({
                rides: rides_update.sort(sort_alg)
            });

        case actionTypes.UPDATE_FILTERS:
            if(action.filter.status && action.filter.status === '') {
                return state.merge({
                    rides: state.all_rides,
                    search_options: {
                        ...state.search_options,
                        ...action.filter,
                    }
                })
            }

            let filters = {
                ...state.search_options,
                ...action.filter,
            };
            localStorage.setItem(actions.FILTERS_STORAGE_KEY, JSON.stringify(filters));
            return state.merge({
                search_options: filters
            });

        case actionTypes.UPDATE_RIDE_OPTIONS:
            let options = {
                ...state.ride_search_options,
                ...action.filter,
            };
            localStorage.setItem(actions.RIDE_OPTIONS_STORAGE_KEY, JSON.stringify(options));
            return state.merge({
                ride_search_options: options
            });

        case actionTypes.GET_ESTIMATES_REQUEST:
            return state.merge({
                processing_estimates   : true,
                get_estimates_key      : action.key
            });
        case actionTypes.GET_ESTIMATES_SUCCESS:
            if(state.get_estimates_key === action.key){
                return state.merge({
                    processing_estimates : false,
                    estimates      : action.estimates,
                    stats          : action.stats,
                    groups         : action.groups,
                });
            }
            break;
        case actionTypes.GET_ESTIMATES_FAIL:
            return state.merge({
                processing_estimates   : false
            });
        case actionTypes.GET_ESTIMATES_ERROR:
            return state.merge({
                processing_estimates   : false
            });

        case actionTypes.GET_ETA_REQUEST:
            return state.merge({
                eta   : {
                    ...state.eta,
                    processing: true
                }
            });
        case actionTypes.GET_ETA_SUCCESS:
            return state.merge({
                eta : {
                    ...state.eta,
                    drivers     : action.drivers,
                    eta         : action.eta,
                    processing  : false
                }
            });
        case actionTypes.GET_ETA_FAIL:
            return state.merge({
                eta : {
                    ...state.eta,
                    processing: false
                }
            });
        case actionTypes.GET_ETA_ERROR:
            return state.merge({
                eta : {
                    ...state.eta,
                    processing: false
                }
            });


        case actionTypes.ESTIMATE_REQUEST:
            return state.merge({
                processing_estimates   : true
            });
        case actionTypes.ESTIMATE_SUCCESS:
            return state.merge({
                processing_estimates   : false,
                estimate      : action.estimate
            });
        case actionTypes.ESTIMATE_FAIL:
            return state.merge({
                processing_estimates   : false
            });
        case actionTypes.ESTIMATE_ERROR:
            return state.merge({
                processing_estimates   : false
            });
        case actionTypes.RESET_ESTIMATE:
            return state.merge({
                estimate   : null
            });

        // brokered
        case actionTypes.UPDATE_BROKER_STATUS:
            return state.merge({
                brokered   : action.status
            });
// PLACES
        case actionTypes.GET_PLACES_REQUEST:
            return state.merge({
            });
        case actionTypes.GET_PLACES_SUCCESS:
            return state.merge({
                places: action.places
            });
        case actionTypes.GET_PLACES_FAIL:
            return state.merge({
                places: []
            });
        case actionTypes.GET_PLACES_ERROR:
            return state.merge({
                places: []
            });


        default:
            return state;
    }
}
