import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditPlayer from './edit_player';
import { getPlayersAndTemplates, newPlayer} from '../../actions/player_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));
  const errors = state.errors.players || {};
  const teamId = ownProps.match.params.teamId;
  const templateId = ownProps.match.params.templateId;
  const team = state.entities.teams[teamId];
  const template = state.entities.templates[templateId];
  const players = state.entities.players;

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
    templateId,
    template,
    players,
  };
};

const mdp = dispatch => {
  return {
    getPlayersAndTemplates: teamId => dispatch(getPlayersAndTemplates(teamId)),
    formAction: (player, historyPush) => dispatch(newPlayer(player, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(EditPlayer));
