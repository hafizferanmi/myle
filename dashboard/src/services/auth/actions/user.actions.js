import history from '../../../history';
import _ from '../../../@lodash';
import store from '../../../createStore';
import jwtService from '../../jwtService';
import * as FuseActions from "../../../services/fuse/actions";
import {setDefaultSettings, setInitialSettings} from "../../../services/fuse/actions";
import * as actionTypes from '../actionTypes';


/**
 * Set User Data
 */
export function setUserData(user)
{
    return (dispatch) => {

        /*
        Set User Settings
         */
        dispatch(setDefaultSettings(user.data.settings));

        /*
        Set User Data
         */
        dispatch({
            type   : actionTypes.SET_USER_DATA,
            payload: user
        })
    }
}

/**
 * Update User Settings
 */
export function updateUserSettings(settings)
{
    return (dispatch, getState) => {
        const oldUser = getState().AuthReducer.user;
        const user = _.merge({}, oldUser, {data: {settings}});

        updateUserData(user);

        return dispatch(setUserData(user));
    }
}

/**
 * Update User Shortcuts
 */
export function updateUserShortcuts(shortcuts)
{
    return (dispatch, getState) => {
        const user = getState().AuthReducer.user;
        const newUser = {
            ...user,
            data: {
                ...user.data,
                shortcuts
            }
        };

        updateUserData(newUser);

        return dispatch(setUserData(newUser));
    }
}

/**
 * Remove User Data
 */
export function removeUserData()
{
    return {
        type: actionTypes.REMOVE_USER_DATA
    }
}

/**
 * Logout
 */
export function logoutUser()
{

    return (dispatch, getState) => {

        const user = getState().AuthReducer.user;

        if ( user.role === 'guest' )
        {
            return null;
        }

        history.push({
            pathname: '/'
        });

        jwtService.logout();

        dispatch(setInitialSettings());

        dispatch({
            type: actionTypes.USER_LOGGED_OUT
        })
    }
}

/**
 * Update User Data
 */
function updateUserData(user)
{
    if ( user.role === 'guest' )
    {
        return;
    }

    jwtService.updateUserData(user)
        .then(() => {
            store.dispatch(FuseActions.showMessage({message: "User data saved with api"}));
        })
        .catch(error => {
            store.dispatch(FuseActions.showMessage({message: error.message}));
        });
}
