import * as actionTypes from '../actionTypes';

const initialState = {
    state  : null,
    options: {
        anchorOrigin    : {
            vertical  : 'top',
            horizontal: 'center'
        },
        autoHideDuration: 6000,
        message         : "Hi",
        variant         : null
    }
};

const message = function (state = initialState, action) {
    switch ( action.type )
    {
        case actionTypes.SHOW_MESSAGE:
        {
            return {
                state  : true,
                options: {
                    ...initialState.options,
                    ...action.options
                }
            };
        }
        case actionTypes.HIDE_MESSAGE:
        {
            return {
                ...state,
                state: null
            };
        }
        default:
        {
            return state;
        }
    }
};

export default message;
