import { connect } from 'react-redux';
import {
  login,
  clearSessionErrors } from '../../actions/session_actions';
import Login from './login';

const msp = state => {
  const errors = state.errors.session;

  return {
    errors,
  };
};

const mdp = dispatch => {
  return {
    login: user => dispatch(login(user)),
    clearErrors: () => dispatch(clearSessionErrors()),
  };
};

export default connect(msp, mdp)(Login);
