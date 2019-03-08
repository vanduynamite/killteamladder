import { connect } from 'react-redux';
import EditMatch from './edit_match';
import { withRouter } from 'react-router-dom';
import {
  deleteMatch,
  getMatch
} from '../../actions/match_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1)); //console.log(ladder);
  const matchId = ownProps.match.params.matchId;
  const currentUserId = state.session.id;

  const errors = state.errors.match || {};
  const teams = state.entities.teams;
  const matches = state.entities.matches;

  const currentMatch = matches[matchId];

  const deleteForm = true;

  return {
    ladder,
    matchId,
    currentUserId,
    errors,
    teams,
    matches,
    currentMatch,
    deleteForm,
  };
};

const mdp = dispatch => {
  return {
    getMatch: id => dispatch(getMatch(id)),
    submitAction: (match, historyPush) => dispatch(deleteMatch(match, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(EditMatch));
