import {
  RECEIVE_TEAMS,
  RECEIVE_TEAM_ERRORS,
  CLEAR_TEAM_ERRORS,
} from '../../actions/team_actions';
import { merge } from 'lodash';

const sessionErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {};

  switch (action.type) {
    case RECEIVE_TEAM_ERRORS:
      const errors = {};
      action.errors.responseJSON.map(error => errors[errorFieldMap[error]] = error);
      return merge(newState, errors);

    case RECEIVE_TEAMS:
    case CLEAR_TEAM_ERRORS:
      return newState;

    default:
      return newState;

  }

};

const errorFieldMap = {
  "Team name is too long (maximum is 40 characters)": "teamName",
  "Team name has already been taken": "teamName",
  "Faction is not included in the list": "faction",
};

export default sessionErrorsReducer;

// ["Incorrect username or password"],
