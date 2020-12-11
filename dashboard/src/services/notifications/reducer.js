import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
   notifications: []
});

export default function NotificationsReducer(state = initialState, {type, ...action}) {
    switch(type) {

        case actionTypes.SHOW_NOTIFICATION:
            return state.merge({
                notifications: [
                    ...state.notifications,
                    {
                        title   : action.title,
                        body    : action.body,
                        variant : action.variant
                    }
                ]
            });
        case actionTypes.CLEAR_NOTIFICATION:
            return state.merge({
                notifications: state.notifications.filter((notification) => notification !== action.notification)
            });

        default:
            return state;
    }
}
