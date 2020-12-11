import * as actionTypes from './actionTypes';
import * as actionAppTypes from '../app/actionTypes';
import HttpService from '../HttpService';
import history from "../../history";


export function requestCode(phone_number) {
    return function (dispatch, getState) {
        try {
            dispatch({type : actionTypes.REQUEST_VERIFICATION_CODE_REQUEST });

            HttpService.postPure('/auth/request', {
                phone_number: phone_number,
            }, (response) => {
                dispatch({type : actionTypes.REQUEST_VERIFICATION_CODE_SUCCESS});
            }, (error) => {
                dispatch({type : actionTypes.REQUEST_VERIFICATION_CODE_FAIL });
            });

        }catch (error) {
            dispatch({type : actionTypes.REQUEST_VERIFICATION_CODE_ERROR });
        }
    }
}

export function cancel_verify() {
    return function (dispatch, getState) {
        dispatch({type : actionTypes.CANCEL_VERIFICATION });
    }
}

export function agree_verify() {
    return function (dispatch, getState) {
        dispatch({type : actionTypes.AGREE_VERIFICATION });
    }
}


export function verifyCode(phone_number, verification_code) {
    return function (dispatch, getState) {
        try {
            dispatch({type : actionTypes.VERIFY_VERIFICATION_CODE_REQUEST });

            HttpService.postPure('/auth/verify', {
                phone_number      : phone_number,
                verification_code : verification_code
            }, (response) => {
                localStorage.setItem('id_token', response.token);
                localStorage.setItem('jwt_access_token', response.token);
                localStorage.setItem('isLoading', response.token);

                dispatch({type : actionTypes.VERIFY_VERIFICATION_CODE_SUCCESS,
                    user: response.user,
                    token: response.token
                });
                dispatch({type : actionAppTypes.TOKEN_SUCCESS,
                    token: response.token
                });
                window.location.reload()

            }, (error) => {
                console.log(error);
                dispatch({type : actionTypes.VERIFY_VERIFICATION_CODE_FAIL });
            });

        }catch (error) {
            dispatch({type : actionTypes.VERIFY_VERIFICATION_CODE_ERROR });
        }
    }
}

export function getCompanies() {
    return function (dispatch, getState) {
        try {
            dispatch({type : actionTypes.GET_COMPANIES_REQUEST });
            HttpService.get('/auth/companies', {
            }, (response) => {
                if(response.companies.length === 0) {
                    dispatch(logout());
                }
                dispatch({type : actionTypes.GET_COMPANIES_SUCCESS, companies: response.companies});
            }, (error) => {
                console.log(error);
                dispatch({type : actionTypes.GET_COMPANIES_FAIL });
                dispatch(logout());
            });

        }catch (error) {
            dispatch({type : actionTypes.GET_COMPANIES_ERROR });
        }
    }
}

export function logout() {
    return function (dispatch, getState) {
        localStorage.removeItem('id_token');
        localStorage.removeItem('jwt_access_token');
        localStorage.removeItem('isLoading');
        history.replace('login');
    }
}
