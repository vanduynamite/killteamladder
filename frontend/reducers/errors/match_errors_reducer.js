import { RECEIVE_TEAMS } from '../../actions/team_actions';
import { RECEIVE_MATCH_ERRORS } from '../../actions/match_actions';
import { merge } from 'lodash';

const matchErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {};

  switch (action.type) {
    case RECEIVE_MATCH_ERRORS:
      const errors = {};
      action.errors.responseJSON.map(error => errors[errorFieldMap[error]] = error);
      return merge(newState, errors);

    case RECEIVE_TEAMS:
      return newState;

    default:
      return newState;

  }

};

const errorFieldMap = {
  "Your team is not included in the list": "teamId",
  "You cannot log two matches in a row against the same opposing team": "opponentTeamId",
  "Opponent's team is not included in the list": "opponentTeamId",
  "You cannot match up against one of your own teams": "opponentTeamId",
  "Matchup results are invalid": "result",
};

export default matchErrorsReducer;
