import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    isLoading: false,
    error_verification_code: false,

    processing: false,
    step: 'step-1',
    error: false,

    companies: []
});

export default function (state=initialState, {type, ...action}) {

    switch(type) {
        case actionTypes.REQUEST_VERIFICATION_CODE_REQUEST:
            return state.merge({
                processing: true,
                error: false
            });
        case actionTypes.REQUEST_VERIFICATION_CODE_SUCCESS:
            return state.merge({
                processing: false,
                error_verification_code: false,
                step: 'step-2',
            });
        case actionTypes.REQUEST_VERIFICATION_CODE_FAIL:
            return state.merge({
                processing: false,
                step: 'step-1',
                error: true
            });
        case actionTypes.REQUEST_VERIFICATION_CODE_ERROR:
            return state.merge({
                processing: false,
            });
        case actionTypes.CANCEL_VERIFICATION:
            return state.merge({
                step: 'step-1',
            });
        case actionTypes.AGREE_VERIFICATION:
            return state.merge({
                step: 'step-3',
            });

        case actionTypes.VERIFY_VERIFICATION_CODE_REQUEST:
            return state.merge({
                processing: true
            });
        case actionTypes.VERIFY_VERIFICATION_CODE_SUCCESS:
            return state.merge({
                isLoading: true,
                processing: false
            });
        case actionTypes.VERIFY_VERIFICATION_CODE_FAIL:
            return state.merge({
                error_verification_code: true
            });

// GET_COMPANIES
        case actionTypes.GET_COMPANIES_REQUEST:
            return state.merge({
            });
        case actionTypes.GET_COMPANIES_SUCCESS:
            return state.merge({
                companies: action.companies
            });
        case actionTypes.GET_COMPANIES_FAIL:
            return state.merge({
            });
        case actionTypes.GET_COMPANIES_ERROR:
            return state.merge({
            });
        default:
            return state;
    }
}
