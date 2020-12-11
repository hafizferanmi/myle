import { combineReducers } from 'redux';

// import reducers
import AuthReducer from './auth/reducer';
import AppReducer from './app/reducer';
import FuseReducer from './fuse/reducer';
import login from './login/reducer';
import rides from './rides/reducer';
import map from './map/reducer';
import notes from './notes/reducer';
import notifications from './notifications/reducer';
import cars from './cars/reducer';
import settings from './settings/reducer';
import clients from './clients/reducer';
const getRootReducer = (asyncReducers) => {
    const reducers = {
        AuthReducer: AuthReducer,
        AppReducer: AppReducer,
        app           :  AppReducer,
        FuseReducer   : FuseReducer,
        login         : login,
        ...asyncReducers,
        rides         : rides,
        map           : map,
        notes         : notes,
        notifications : notifications,
        cars          : cars,
        settings      : settings,
        clients       : clients
    };

    return combineReducers(reducers)
};
export default getRootReducer;
