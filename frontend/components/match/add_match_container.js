import { connect } from 'react-redux';
import AddMatch from './add_match';
import { withRouter } from 'react-router-dom';

const msp = state => {
  const loggedIn = state.session.id !== undefined;
  let currentUser;
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

export default withRouter(connect(msp, mdp)(AddMatch));
