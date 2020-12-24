import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import {
  signup,
  clearSessionErrors } from '../../actions/session_actions';
import Signup from './signup';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));
  const errors = state.errors.session;
  const title = 'Register';

  return {
    ladder,
    errors,
    title,
  };
};

const mdp = dispatch => {
  return {
    submitAction : user => dispatch(signup(user)),
    clearErrors: () => dispatch(clearSessionErrors()),
  };
};

export default withRouter(connect(msp, mdp)(Signup));
