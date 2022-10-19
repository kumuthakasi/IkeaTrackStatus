import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as counterActions from './actions';

function App(props) {
  const { CounterActions, number } = props;
  return (
    <div>
      <h1>{number}</h1>
      <button type="button" onClick={() => CounterActions.increment()}>
        +
      </button>
      <button type="button" onClick={() => CounterActions.decrement()}>
        -
      </button>
    </div>
  );
}

App.propTypes = {
  // props.counterActions.increment: PropTypes.number.isRequired,
  // onTap: PropTypes.func.isRequired,
  CounterActions: PropTypes.func.isRequired,
  number: PropTypes.number.isRequired
};

export default connect(
  (state) => ({
    number: state.counter
  }),
  (dispatch) => ({
    CounterActions: bindActionCreators(counterActions, dispatch)
  })
)(App);
