import { connect } from 'react-redux';
import NewMatch from './new_match';
import { withRouter } from 'react-router-dom';
import { newMatch } from '../../actions/match_actions';

const msp = state => {
  const loggedIn = state.session.id !== undefined;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  const errors = state.errors.match || {};
  const teams = state.entities.teams;

  return {
    loggedIn,
    currentUser,
    errors,
    teams,
  };
};

const mdp = dispatch => {
  return {
    newMatch: (match, historyPush) => dispatch(newMatch(match, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(NewMatch));
