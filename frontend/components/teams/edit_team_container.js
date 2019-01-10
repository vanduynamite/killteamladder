import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditTeam from './edit_team';
import {
  editTeam ,
  getTeam
} from '../../actions/team_actions';

const msp = (state, ownProps) => {
  const errors = state.errors.teams || {};
  const teamId = ownProps.match.params.teamId;
  const team = state.entities.teams[teamId];

  let ownerId;
  if (team) ownerId = team.userId;
  let currentUserId;
  if (state.session.id) currentUserId = state.session.id;

  return {
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
