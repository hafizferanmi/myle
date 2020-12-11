import jwtService from 'services/jwtService';
import {setUserData} from './user.actions';
import * as actionTypes from '../actionTypes';



export function submitLogin({email, password})
{
    return (dispatch) =>
        jwtService.signInWithEmailAndPassword(email, password)
            .then((user) => {
                    dispatch(setUserData(user));

                    return dispatch({
                        type: actionTypes.LOGIN_SUCCESS
                    });
                }
            )
            .catch(error => {
                return dispatch({
                    type   : actionTypes.LOGIN_ERROR,
                    payload: error
                });
            });
}

