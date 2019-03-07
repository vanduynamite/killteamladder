import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getTeam, editTeam } from '../../actions/team_actions';
import { setPathHistory,
  clearPathHistory
} from '../../actions/ui_actions';
import RetireTeam from './retire_team';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1)); console.log(ladder);
  const users = state.entities.users;

  let currentUser;
  if (state.session.id) currentUser = state.entities.users[state.session.id];

  let currentTeam;
  const currentTeamId = ownProps.match.params.teamId;
  currentTeam = state.entities.teams[currentTeamId];

  const ownerViewing = currentUser && currentTeam ?
    currentUser.id === currentTeam.userId :
    false;

  return {
    ladder,
    currentUser,
    currentTeam,
    currentTeamId,
    ownerViewing,
  };
};

const mdp = dispatch => {
  return {
    getTeam: id => dispatch(getTeam(id)),
    editTeam: (team, historyPush) => dispatch(editTeam(team,historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(RetireTeam));
