import { takeEvery, all } from 'redux-saga/effects'
//sagas
import { init } from './AppSagas';

export default function*() {
    yield all([
        takeEvery('app.init', init),
    ])
}
