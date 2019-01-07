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
  "First name can't be blank": "firstName",
  "Last name can't be blank": "lastName",
};

export default sessionErrorsReducer;

// ["Incorrect username or password"],
