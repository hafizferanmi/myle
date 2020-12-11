import * as actionTypes from '../actionTypes';

const initialState = {
    role: 'guest',
    data: {
        'displayName': 'John Doe',
        'photoURL'   : 'assets/images/avatars/Velazquez.jpg',
        'email'      : 'johndoe@withinpixels.com',
        shortcuts    : [
            'calendar',
            'mail',
            'contacts',
            'todo'
        ]
    }
};

const user = function (state = initialState, action) {
    switch ( action.type )
    {
        case actionTypes.SET_USER_DATA:
        {
            return {
                ...initialState,
                ...action.payload
            };
        }
        case actionTypes.REMOVE_USER_DATA:
        {
            return {
                ...initialState
            };
        }
        case actionTypes.USER_LOGGED_OUT:
        {
            return initialState;
        }
        default:
        {
            return state
        }
    }
};

export default user;
