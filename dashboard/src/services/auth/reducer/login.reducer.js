import * as actionTypes from '../actionTypes';

const initialState = {
    success: false,
    error  : {
        username: null,
        password: null
    }
};

const login = function (state = initialState, action) {
    switch ( action.type )
    {
        case actionTypes.LOGIN_SUCCESS:
        {
            return {
                ...initialState,
                success: true
            };
        }
        case actionTypes.LOGIN_ERROR:
        {
            return {
                success: false,
                error  : action.payload
            };
        }
        default:
        {
            return state
        }
    }
};

export default login;