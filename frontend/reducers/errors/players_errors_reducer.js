import {
  RECEIVE_PLAYERS,
  RECEIVE_PLAYER_ERRORS,
} from '../../actions/player_actions';
import { merge } from 'lodash';

const playersErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {};

  switch (action.type) {
    case RECEIVE_PLAYER_ERRORS:
      const errors = {};
      action.errors.responseJSON.map(error => errors[errorFieldMap[error]] = error);
      return merge(newState, errors);

    case RECEIVE_PLAYERS:
      return newState;

    default:
      return newState;

  }

};

const errorFieldMap = {
  "Team name has already been taken": "name",
  "Faction is not included in the list": "number",
};

export default playersErrorsReducer;
