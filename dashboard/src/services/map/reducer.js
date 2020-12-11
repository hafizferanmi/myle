import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';


const initialState = Immutable({
    pick_up_marker: null,
    drop_off_marker: null,
});

export default function (state=initialState, {type, ...action}) {

    switch(type) {
        case actionTypes.SET_PICK_UP_MARKER:
            return state.merge({
                pick_up_marker   : action.value,
            });

        case actionTypes.SET_DROP_OFF_MARKER:
            return state.merge({
                drop_off_marker  : action.value,
            });

        case actionTypes.CANCEL_SET_MARKER:
            return state.merge({
                pick_up_marker  : null,
                drop_off_marker : null,
            });


        default:
            return state;
    }
}
