// import actions
import * as AuthActions from './auth/actions';
import * as FuseActions from './fuse/actions';
import * as LoginActions from './login/actions';
import * as RidesActions from './rides/actions';
import * as MapActions from './map/actions';
import * as NotesActions from './notes/actions';
import * as AppActions from './app/actions';
import * as NotificationsActions from './notifications/actions';
import * as CarsActions from './cars/actions';
import * as SettingsActions from './settings/actions';
import * as ClientsActions from './clients/actions';


//import actionTypes
import * as AuthActionTypes from './auth/actionTypes';
import * as FuseActionTypes from './fuse/actionTypes';
import * as LoginActionTypes from './login/actionTypes';
import * as RidesActionTypes from './rides/actionTypes';
import * as MapActionTypes from './map/actionTypes';
import * as NotesActionTypes from './notes/actionTypes';
import * as AppActionTypes from './app/actionTypes';
import * as ClientsActionTypes from './clients/actionTypes';

export const actions =  {
    AuthActions,
    FuseActions,
    LoginActions,
    RidesActions,
    MapActions,
    NotesActions,
    AppActions,
    NotificationsActions,
    CarsActions,
    SettingsActions,
    ClientsActions,
};

export const ActionTypes = {
    AppActionTypes,
    AuthActionTypes,
    FuseActionTypes,
    LoginActionTypes,
    RidesActionTypes,
    MapActionTypes,
    NotesActionTypes,
    ClientsActionTypes,
};

export default {actions, ActionTypes};
