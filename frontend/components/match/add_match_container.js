import { connect } from 'react-redux';
import AddMatch from './add_match';

const msp = state => {
  const loggedIn = state.session.id !== undefined;
  let currentUser = undefined;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  return {
    loggedIn,
    currentUser,
  };
};

const mdp = dispatch => {
  return {

  };
};

export default connect(msp, mdp)(AddMatch);
