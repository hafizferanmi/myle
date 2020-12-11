import * as actionTypes from './actionTypes';
import HttpService from "../HttpService";
import history from "../../history";

export function init() {
    return function (dispatch, getState) {
        dispatch({ type: actionTypes.APP_INIT });
    }
}

export function retrieve() {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.GET_ACCOUNT_REQUEST});
            HttpService.get('/account', {}, (response) => {

                let storage_company = JSON.parse(localStorage.getItem('company'));
                let company;
                if(storage_company) {
                    for(let i = 0; i < response.companies.length; i++){
                        if(response.companies[i].id === storage_company.id){
                            company = response.companies[i];
                        }
                    }
                }

                dispatch({
                    type: actionTypes.GET_ACCOUNT_SUCCESS,
                    user           : response.user,
                    companies      : response.companies,
                    company        : company,
                    document_types : response.document_types
                });

                if(company) {
                    HttpService.setCompany(company.id);
                }

                // dispatch(SettingsActions.retrieve());

            }, (error) => {
                dispatch({type: actionTypes.GET_ACCOUNT_FAIL });
            });
        }catch (error) {
            dispatch({type : actionTypes.GET_ACCOUNT_ERROR });
        }
    }
}


export function updateStatus(options) {
    return function (dispatch, getState) {
        try {
            dispatch({type: actionTypes.UPDATE_ACCOUNT_REQUEST});
            HttpService.post('/account/status', options, (response) => {
                dispatch({
                    type: actionTypes.UPDATE_ACCOUNT_SUCCESS,
                    user: response.user
                });
            }, (error) => {
                dispatch({type: actionTypes.UPDATE_ACCOUNT_FAIL });
            });
        }catch (error) {
            dispatch({type : actionTypes.UPDATE_ACCOUNT_ERROR });
        }
    }
}


export function selectCompany(company, reload = false) {
    return function (dispatch, getState) {
        dispatch({type: actionTypes.SELECT_COMPANY, company, company_id: company ? company.id : 0});
        if(company) {
            HttpService.setCompany(company.id);
        }
        localStorage.setItem('company', JSON.stringify(company));
        if(reload) {
            history.push('/rides');
            window.location.reload();
        }
    }
}
