import { connect } from 'react-redux';
import EditMatch from './edit_match';
import { withRouter } from 'react-router-dom';
import {
  deleteMatch,
  getMatch
} from '../../actions/match_actions';

const msp = (state, ownProps) => {
  const matchId = ownProps.match.params.matchId;
  const currentUserId = state.session.id;

  const errors = state.errors.match || {};
  const teams = state.entities.teams;
  const matches = state.entities.matches;

  const currentMatch = matches[matchId];

  const deleteForm = true;

  return {
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
