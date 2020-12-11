import {  put, all } from 'redux-saga/effects';
import * as AppActionTypes from '../services/app/actionTypes'; // works
import * as AppActions from '../services/app/actions'; // works
import * as SettingsActions from '../services/settings/actions'; // works
import * as LoginActions from '../services/login/actions'; // works
import HttpService from '../services/HttpService';
import history from '../history';

export function* init() {
    try {
        let token = localStorage.getItem('jwt_access_token');
        HttpService.setToken(token);
        let valid = HttpService.isAuthTokenValid();
        if(valid === true){
            let company = JSON.parse(localStorage.getItem('company'));
            if(company) {
                HttpService.setCompany(company.id);
                yield put(AppActions.selectCompany(company));
            }else{
                // select company
                yield put(LoginActions.getCompanies());
                history.push('/select-company');
            }

            yield all([
                yield put({ // socket.io
                    type:'authenticate',
                    token:token,
                }),
                yield put({type : AppActionTypes.TOKEN_SUCCESS,
                    token: token,
                }),
                yield put(AppActions.retrieve()),
                yield put(SettingsActions.retrieve())
            ]);


            if(window.location.pathname === '/'){
                history.push('/rides');
            }
        } else {
            setTimeout(() => {
                history.push('/');
            }, 1300);
            HttpService.setToken(null);
        }

    } catch (error) {}
}

