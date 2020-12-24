import { connect } from 'react-redux';
import NewMatch from './new_match';
import { withRouter } from 'react-router-dom';
import { getTeams } from '../../actions/team_actions';
import { newMatch } from '../../actions/match_actions';
import { getUser } from '../../actions/user_actions';
import { setPathHistory,
  clearPathHistory
} from '../../actions/ui_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));
  const loggedIn = state.session.id !== undefined;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  const errors = state.errors.match || {};
  const teams = state.entities.teams;
  const users = state.entities.users;

  let cameFromTeamId;
  if (state.ui.history) cameFromTeamId = state.ui.history.team;

  return {
    ladder,
    loggedIn,
    currentUser,
    errors,
    teams,
    users,
    cameFromTeamId,
  };
};

const mdp = dispatch => {
  return {
    getTeams: (ladder) => dispatch(getTeams(ladder)),
    getUser: (id, ladder) => dispatch(getUser(id, ladder)),
    newMatch: (match, historyPush) => dispatch(newMatch(match, historyPush)),
    setPathHistory: data => dispatch(setPathHistory(data)),
    clearPathHistory: () => dispatch(clearPathHistory()),
  };
};

export default withRouter(connect(msp, mdp)(NewMatch));
