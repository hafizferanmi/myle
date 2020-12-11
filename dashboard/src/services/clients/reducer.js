import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    all_clients: [],
    clients: [],
    processing: false,
    total: 0,
    page : 1,
    per_page : 20,
    search :  '',
    sort_by : 'users.created_at',
    sort_by_type : true,

    filter: {
        status: 'all',
    },
    client: null,             // TODO <-- this is for driver individual page
    client_processing: false,
    client_car_processing: false,
    credit_processing: false,
    debit_processing: false,


    client_rides: {
        rides: [],
        total: 0,
        processing: false,
        page : 1,
        per_page : 100,
    },
    search_clients: []
});

export default function ClientsReducer(state = initialState, {type, ...action}) {

    switch(type) {
        /** CLIENTS **/
        case actionTypes.GET_CLIENTS_REQUEST:
            return state.merge({
                processing   : true,
                page         : action['page'],
            });
        case actionTypes.GET_CLIENTS_SUCCESS:

            return state.merge({
                processing  : false,
                all_clients : action.clients,
                clients     : action.clients,
                total       : action.total,
                groups      : action.groups
            });
        case actionTypes.GET_CLIENTS_FAIL:
            return state.merge({
                processing   : false
            });
        case actionTypes.GET_CLIENTS_ERROR:
            return state.merge({
                processing   : false
            });

/** SEARCH CLIENTS **/
        case actionTypes.SEARCH_RIDERS_REQUEST:
            return state.merge({
            });
        case actionTypes.SEARCH_RIDERS_SUCCESS:
            return state.merge({
                search_clients : action.clients
            });
        case actionTypes.SEARCH_RIDERS_FAIL:
            return state.merge({
                search_clients: []
            });
        case actionTypes.SEARCH_RIDERS_ERROR:
            return state.merge({
                search_clients: []
            });

        /** CLIENT **/
        case actionTypes.GET_CLIENT_REQUEST:
            return state.merge({
                client_processing   : true,
            });
        case actionTypes.GET_CLIENT_SUCCESS:
            return state.merge({
                client_processing   : false,
                client      : action.client
            });
        case actionTypes.GET_CLIENT_FAIL:
            return state.merge({
                client_processing   : false
            });
        case actionTypes.GET_CLIENT_ERROR:
            return state.merge({
                client_processing   : false
            });

        /** UPDATE CLIENT **/
        case actionTypes.UPDATE_CLIENT_REQUEST:
            return state.merge({
                client_processing   : true
            });
        case actionTypes.UPDATE_CLIENT_SUCCESS:
            return state.merge({
                client_processing : false,
                client : state.client ? state.client.id === action.client.id ? {...state.client, ...action.client} : state.client : state.client
            });
        case actionTypes.UPDATE_CLIENT_FAIL:
            return state.merge({
                client_processing   : false
            });
        case actionTypes.UPDATE_CLIENT_ERROR:
            return state.merge({
                client_processing   : false
            });

        /** CLEAR CLIENT **/
        case actionTypes.CLEAR_CLIENT:
            return state.merge({
                client   : null
            });


        case actionTypes.FILTER:
            const {key, value} = action;
            let filter_upd = state.filter.asMutable();
            filter_upd[key] = value;
            return state.merge({
                processing  : false,
                filter: filter_upd,
                clients     : state.all_drivers.filter((client) => {
                    if (action.value === '' || action.value === 'all' ||
                        (client[action.key] && action.value === client[action.key]) ) {
                        return true;
                    } else {
                        return false;
                    }
                })
            });

        default:
            return state;
    }
}
