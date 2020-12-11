import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    token      : '',
    processing : false,
    user       : null,
    company    : null,
    companies  : [],
    document_types: [],
    create_user_processing : false,
    update_user_processing : false
});

export default function (state=initialState, {type, ...action}) {

    switch(type) {
        case actionTypes.TOKEN_SUCCESS:
            return state.merge({
                token   : action.token
            });
        /** GET ACCOUNT **/
        case actionTypes.GET_ACCOUNT_REQUEST:
            return state.merge({
                processing   : true
            });
        case actionTypes.GET_ACCOUNT_SUCCESS:
            return state.merge({
                processing     : false,
                user           : action.user,
                company        : action.company,
                companies      : action.companies,
                document_types : action.document_types
            });
        case actionTypes.GET_ACCOUNT_FAIL:
            return state.merge({
                processing   : false,
                user         : null
            });
        case actionTypes.GET_ACCOUNT_ERROR:
            return state.merge({
                processing   : false,
                user         : null
            });

        /** UPDATE ACCOUNT **/
        case actionTypes.UPDATE_ACCOUNT_REQUEST:
            return state.merge({
                processing   : true
            });
        case actionTypes.UPDATE_ACCOUNT_SUCCESS:
            return state.merge({
                processing : false,
                user       : action.user
            });
        case actionTypes.UPDATE_ACCOUNT_FAIL:
            return state.merge({
                processing   : false,
                user         : null
            });
        case actionTypes.UPDATE_ACCOUNT_ERROR:
            return state.merge({
                processing   : false,
                user         : null
            });


        case actionTypes.SELECT_COMPANY:
            return state.merge({
                company   : action.company
            });

        default:
            return state;
    }
}
