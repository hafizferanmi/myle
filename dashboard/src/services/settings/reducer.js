import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    retrieve_settings_processing: false,
    payment_methods:[],
    balance : {
        available : 0,
        pending   : 0
    },
    company_facilities: [],
    transactions:[],
    transactions_chart:[],
    users: [],
    service_fees_processing: false,
    service_fees: [],
    filters: {
        status: 'all',
        type: 'all'
    },
});

export default function SettingsReducer(state = initialState, {type, ...action}) {
    switch(type) {

        case actionTypes.GET_SETTINGS_REQUEST:
            return state.merge({
                retrieve_settings_processing   : true
            });
        case actionTypes.GET_SETTINGS_SUCCESS:

            return state.merge({
                retrieve_settings_processing  : false,
                payment_methods      : action.payment_methods,
                balance              : action.balance,
                transactions         : action.transactions,
                transactions_chart   : action.transactions_chart,
                company_facilities   : action.company_facilities,
                users                : action.users
            });
        case actionTypes.GET_SETTINGS_FAIL:
            return state.merge({
                retrieve_settings_processing   : false
            });
        case actionTypes.GET_SETTINGS_ERROR:
            return state.merge({
                retrieve_settings_processing   : false
            });



        /** CREATE USER **/
        case actionTypes.CREATE_USER_REQUEST:
            return state.merge({
                create_user_processing   : true
            });
        case actionTypes.CREATE_USER_SUCCESS:
            return state.merge({
                create_user_processing : false,
                users: state.users.concat(action.user)
            });
        case actionTypes.CREATE_USER_FAIL:
            return state.merge({
                create_user_processing   : false,
            });
        case actionTypes.CREATE_USER_ERROR:
            return state.merge({
                create_user_processing   : false,
            });

        /** UPDATE USER **/
        case actionTypes.UPDATE_USER_REQUEST:
            return state.merge({
                update_user_processing   : true
            });
        case actionTypes.UPDATE_USER_SUCCESS:
            return state.merge({
                update_user_processing : false,
            });
        case actionTypes.UPDATE_USER_FAIL:
            return state.merge({
                update_user_processing   : false,
            });
        case actionTypes.UPDATE_USER_ERROR:
            return state.merge({
                update_user_processing   : false,
            });


/** SERVICE FEES **/
        case actionTypes.GET_SERVICE_FEES_REQUEST:
            return state.merge({
                service_fees_processing: true
            });
        case actionTypes.GET_SERVICE_FEES_SUCCESS:
            return state.merge({
                service_fees_processing : false,
                service_fees            : action.service_fees,
            });
        case actionTypes.GET_SERVICE_FEES_FAIL:
            return state.merge({
                service_fees_processing: false
            });
        case actionTypes.GET_SERVICE_FEES_ERROR:
            return state.merge({
                service_fees_processing: false
            });

        // FILTERS
        case actionTypes.UPDATE_FILTERS:
            const {key, value} = action;
            let filter_upd = JSON.parse(JSON.stringify(state.filters));
            filter_upd[key] = value;
            return state.merge({
                filters: filter_upd
            });
        default:
            return state;
    }
}
