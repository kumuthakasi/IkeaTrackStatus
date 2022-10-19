import { all } from 'redux-saga/effects';
import { counterSaga } from '../actions';

export default function* rootSaga() {
  yield all([counterSaga()]);
}
