import { RECEIVE_TEAMS } from '../../actions/team_actions';
import { RECEIVE_MATCH_ERRORS } from '../../actions/match_actions';
import { merge } from 'lodash';

const sessionErrorsReducer = (state = {}, action) => {
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
  "Your team is not included in the list": "teamName",
  "You cannot log two matches in a row against the same opposing team": "opponentTeam",
  "Opponent's team is not included in the list": "opponentTeam",
  "You cannot match up against one of your own teams": "opponentTeam",
  "Matchup results are invalid": "result",
};

export default sessionErrorsReducer;

// ["Incorrect username or password"],
