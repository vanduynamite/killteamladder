import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Login from './login';

const msp = state => {
  const errors = state.errors.session;

  return {
    errors,
  };
};

const mdp = dispatch => {
  return {
    login: (user) => dispatch(login(user)),
  };
};

export default connect(msp, mdp)(Login);
