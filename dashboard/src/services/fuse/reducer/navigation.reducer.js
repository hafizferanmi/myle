import * as actionTypes from '../actionTypes';
import navigationConfig from "../../../config/navigationConfig";

const initialState = navigationConfig;

const navigation = function (state = initialState, action) {
    switch ( action.type )
    {
        case actionTypes.GET_NAVIGATION:
        {
            return [
                ...state
            ];
        }
        case actionTypes.SET_NAVIGATION:
        {
            return [
                ...action.navigation
            ];
        }
        case actionTypes.RESET_NAVIGATION:
        {
            return [
                ...initialState
            ];
        }
        default:
        {
            return state;
        }
    }
};

export default navigation;
