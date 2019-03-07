import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditTeam from './edit_team';
import {
  editTeam ,
  getTeam
} from '../../actions/team_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1)); console.log(ladder);
  const errors = state.errors.teams || {};
  const teamId = ownProps.match.params.teamId;
  const team = state.entities.teams[teamId];

  let ownerId;
  if (team) ownerId = team.userId;
  let currentUserId;
  if (state.session.id) currentUserId = state.session.id;

  return {
    ladder,
    errors,
    teamId,
    team,
    currentUserId,
    ownerId,
  };
};

const mdp = dispatch => {
  return {
    getTeam: id => dispatch(getTeam(id)),
    editTeam: (team, historyPush) => dispatch(editTeam(team, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(EditTeam));
