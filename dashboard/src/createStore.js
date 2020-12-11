import {applyMiddleware, compose, createStore} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger'
import getRootReducer from './services/reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client';
import { init } from './services/app/actions';

const sagaMiddleware = createSagaMiddleware();

let socket = io('https://api-robot.myle.tech:9292', {
    reconnection: true,
    reconnectionDelay: 500,
    reconnectionDelayMax: 500,
    reconnectionAttempts: Infinity,
    transports: ['websocket'],
    secure: true
});
function optimisticExecute(action, emit, next, dispatch) {
    emit(action.type, action);
    next(action);
}

let socketIoMiddleware = createSocketIoMiddleware(socket, [ 'server/', 'auth' ], {
    execute : optimisticExecute
});

const middlewares = [
    thunk,
    sagaMiddleware,
    socketIoMiddleware
];

if (process.env.NODE_ENV !== 'production') {
    const logger = createLogger({collapsed: true});
    middlewares.push(logger);
}

const enhancers = [
    applyMiddleware(...middlewares)
];

const store = createStore(
    getRootReducer(),
    compose(...enhancers)
);


// Add a dictionary to keep track of the registered async reducer
store.asyncReducers = {};

// Create an inject reducer function
// This function adds the async reducer, and creates a new combined reducer
store.injectReducer = (key, asyncReducer) => {
    store.asyncReducers[key] = asyncReducer;
    store.replaceReducer(getRootReducer(store.asyncReducers))
};

socket.on('unauthorized', function(error) {
    if (error.data.type === 'UnauthorizedError' || error.data.code === 'invalid_token') {
        // redirect user to login page perhaps?
        console.log('Users token has expired');
    }
});
socket.on('reconnect',       () => {
    console.log('SOCKET: reconnect');
    store.dispatch({type: 'authenticate', token: store.getState().AppReducer.token});
});
socket.on('reconnect_attempt',       () => {
    console.log('SOCKET: reconnect_attempt');
    socket.io.opts.transports = ['websocket'];
});

sagaMiddleware.run(rootSaga);

store.dispatch(init());

export default store;
