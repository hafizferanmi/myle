import * as actionTypes from './actionTypes';
import HttpService from '../HttpService';
import {actions} from "../index";

const search_options = {
    page         : 1,
    per_page     : 20,
    entity_type  : 'car',
    entity_id    : 0,
    sort_by      : 'created_at',
    sort_by_type : true
  };

export function createNote(action) {
    return function (dispatch, getState) {
        if (!action.entity_id || !action.body || !action.body.length) {
            dispatch({type : actionTypes.CREATE_NOTE_ERROR });
        }
        try {
            const data = {
                entity_type : action.entity_type,
                entity_id   : action.entity_id,
                category    : action.category,
                body        : action.body
            }
            dispatch({type: actionTypes.CREATE_NOTE_REQUEST});
            HttpService.post('/notes', data , (response) => {
                dispatch({
                    type     : actionTypes.CREATE_NOTE_SUCCESS,
                    note     : data,
                });
            }, (error) => {
                dispatch({type: actionTypes.CREATE_NOTE_FAIL });
            });
        }catch (error) {
            console.log(error);
            dispatch({type : actionTypes.CREATE_NOTE_ERROR });
        }
    }
}

export function updateNote(note) {
    return function (dispatch, getState) {
        if (!note.entity_id || !note.body || !note.body.length) {
            dispatch({type : actionTypes.UPDATE_NOTE_ERROR });
        }

        return new Promise((resolve, reject) => {
            try {
                dispatch({type: actionTypes.UPDATE_NOTE_REQUEST});
                HttpService.post('/notes/'+note.id, note, (response) => {
                    dispatch({
                        type     : actionTypes.UPDATE_NOTE_SUCCESS,
                        note     : note
                    });
                    dispatch(actions.NotificationsActions.alert('Great!', 'You have updated note', 'success'));
                    return resolve();
                }, (error) => {
                    dispatch({type: actionTypes.UPDATE_NOTE_FAIL });
                    dispatch(actions.NotificationsActions.alert('Please try again!', error.error));
                    return reject();
                });
            }catch (error) {
                dispatch({type : actionTypes.UPDATE_NOTE_ERROR });
                return reject();
            }
        });
    }
}

export function getNotes(entity_id, entity_type) {
    return function (dispatch, getState) {
        if (!entity_id || !entity_type ) {
            dispatch({type : actionTypes.GET_NOTES_ERROR, entity_id, entity_type });
        }
        try {
            search_options.entity_id   = entity_id;
            search_options.entity_type = entity_type;

            dispatch({type: actionTypes.GET_NOTES_REQUEST});
            HttpService.get('/notes', search_options , (response) => {
                dispatch({
                    type        : actionTypes.GET_NOTES_SUCCESS,
                    notes       : response.notes.data,
                    entity_id   : entity_id,
                    entity_type : entity_type,
                });
                return Promise.resolve(response.notes.data)

            }, (error) => {
                dispatch({type: actionTypes.GET_NOTES_FAIL });
                return Promise.reject(error);
            });
        }catch (error) {
            console.log(error);
            dispatch({type : actionTypes.GET_NOTES_ERROR });
            return Promise.reject(error);
        }
    }
}
