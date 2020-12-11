import * as actionTypes from '../actionTypes';


const initialState = {
    state  : false,
    options: {
        children: 'Hi'
    },
    stateRides  : false,
    optionsRides: {
        children: 'Hi'
    }
};

const dialog = function (state = initialState, action) {
    switch ( action.type )
    {
        case actionTypes.OPEN_DIALOG:
        {
            return {
                ...state,
                state  : true,
                options: {
                    ...state.options,
                    ...action.options
                }
            };
        }
        case actionTypes.CLOSE_DIALOG:
        {
            return {
                ...state,
                state: false
            };
        }
        case actionTypes.OPEN_RIDES_DIALOG:
        {
            return {
                ...state,
                stateRides  : true,
                optionsRides: {
                    ...state.options,
                    ...action.options
                }
            };
        }
        case actionTypes.CLOSE_RIDES_DIALOG:
        {
            return {
                ...state,
                stateRides: false
            };
        }
        default:
        {
            return state;
        }
    }
};

export default dialog;
