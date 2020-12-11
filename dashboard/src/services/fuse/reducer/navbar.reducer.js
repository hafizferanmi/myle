import * as actionTypes from '../actionTypes';

const initialState = {
    foldedOpen: false,
    mobileOpen: false
};

const navbar = function (state = initialState, action) {
    switch ( action.type )
    {
        case actionTypes.TOGGLE_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: !state.foldedOpen
            }
        }
        case actionTypes.OPEN_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: true
            }
        }
        case actionTypes.CLOSE_FOLDED_NAVBAR:
        {
            return {
                ...state,
                foldedOpen: false
            }
        }
        case actionTypes.TOGGLE_MOBILE_NAVBAR:
        {
            return {
                ...state,
                mobileOpen: !state.mobileOpen
            }
        }
        case actionTypes.OPEN_MOBILE_NAVBAR:
        {
            return {
                ...state,
                mobileOpen: true
            }
        }
        case actionTypes.CLOSE_MOBILE_NAVBAR:
        {
            return {
                ...state,
                mobileOpen: false
            }
        }
        default:
        {
            return state;
        }
    }
};

export default navbar;