import { connect } from 'react-redux';
import { signup } from '../../actions/session_actions';
import Signup from './signup';

const msp = state => {
  // const errors = state.errors.session;
  const errors = {};

  return {
    errors,
  };
};

const mdp = dispatch => {
  return {
    signup: (user) => dispatch(signup(user)),
  };
};

export default connect(msp, mdp)(Signup);
