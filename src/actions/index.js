import { put, takeEvery, delay } from 'redux-saga/effects';
import { handleActions, createAction } from 'redux-actions';

// consts
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';
const INCREMENT_VALUE = 'INCREMENT_VALUE';
const DECREMENT_VALUE = 'DECREMENT_VALUE';

// actions

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);
export const incrementValue = createAction(INCREMENT_VALUE);
export const decrementValue = createAction(DECREMENT_VALUE);

function* incrementSaga() {
  yield delay(500);
  yield put(incrementValue());
}

function* decrementSaga() {
  yield delay(500);
  yield put(decrementValue());
}

export function* counterSaga() {
  yield takeEvery(INCREMENT, incrementSaga);
  yield takeEvery(DECREMENT, decrementSaga);
}

export default handleActions(
  {
    [INCREMENT_VALUE]: (state) => state + 1,
    [DECREMENT_VALUE]: (state) => state - 1
  },
  1 // Initial Value
);
