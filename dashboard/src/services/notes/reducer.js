import * as actionTypes from './actionTypes';
import Immutable from 'seamless-immutable';

const initialState = Immutable({
    notes: [],
    processing: false,
    update_processing: false,
    entity_type  : '',
    entity_id    : 0,
});

export default function NotesReducer(state = initialState, {type, ...action}) {
    switch(type) {
        /** get notes **/
        case actionTypes.GET_NOTES_REQUEST:
            return state.merge({
                processing   : true,
                entity_type  : action.entity_type,
                entity_id    : action.entity_id,
            });
        case actionTypes.GET_NOTES_SUCCESS:

            return state.merge({
                processing  : false,
                notes       : action.notes,
            });
        case actionTypes.GET_NOTES_FAIL:
            return state.merge({
                processing   : false,
                entity_type  : '',
                entity_id    : 0,
            });
        case actionTypes.GET_NOTES_ERROR:
            return state.merge({
                processing   : false,
                entity_type  : '',
                entity_id    : 0,
            });

        /** create note **/
        case actionTypes.CREATE_NOTE_REQUEST:
            return state.merge({
                driver_processing   : true,
            });
        case actionTypes.CREATE_NOTE_SUCCESS:
            return state.merge({
                driver_processing   : false,
                notes       : [action.note, ...state.notes],
                //driver      : action.driver
            });
        case actionTypes.CREATE_NOTE_FAIL:
            return state.merge({
                driver_processing   : false
            });
        case actionTypes.CREATE_NOTE_ERROR:
            return state.merge({
                driver_processing   : false
            });

        /** update note **/
        case actionTypes.UPDATE_NOTE_REQUEST:
            return state.merge({
                update_processing   : true,
            });
        case actionTypes.UPDATE_NOTE_SUCCESS:
            return state.merge({
                update_processing   : false,
                notes       : [action.note, ...state.notes],
            });
        case actionTypes.UPDATE_NOTE_FAIL:
            return state.merge({
                update_processing   : false
            });
        case actionTypes.UPDATE_NOTE_ERROR:
            return state.merge({
                update_processing   : false
            });

        default:
            return state;
    }
}