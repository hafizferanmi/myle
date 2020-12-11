import {FuseUtils} from '@fuse';
import * as actionTypes from '../actionTypes';

export function getNavigation()
{
    return {
        type: actionTypes.GET_NAVIGATION
    }
}

export function setNavigation(navigation)
{
    return {
        type: actionTypes.SET_NAVIGATION,
        navigation
    }
}

export function resetNavigation()
{
    return {
        type: actionTypes.RESET_NAVIGATION
    }
}

export function appendNavigationItem(item, parentId)
{
    return (dispatch, getState) => {
        const {navigation} = getState().fuse;
        return dispatch({
            type      : actionTypes.SET_NAVIGATION,
            navigation: FuseUtils.appendNavItem(navigation, item, parentId)
        });
    }
}

export function prependNavigationItem(item, parentId)
{
    return (dispatch, getState) => {
        const {navigation} = getState().fuse;
        return dispatch({
            type      : actionTypes.SET_NAVIGATION,
            navigation: FuseUtils.prependNavItem(navigation, item, parentId)
        });
    }
}

export function updateNavigationItem(id, item)
{
    return (dispatch, getState) => {
        const {navigation} = getState().fuse;
        return dispatch({
            type      : actionTypes.SET_NAVIGATION,
            navigation: FuseUtils.updateNavItem(navigation, id, item)
        });
    }
}

export function removeNavigationItem(id)
{
    return (dispatch, getState) => {
        const {navigation} = getState().fuse;
        return dispatch({
            type      : actionTypes.SET_NAVIGATION,
            navigation: FuseUtils.removeNavItem(navigation, id)
        });
    }
}
