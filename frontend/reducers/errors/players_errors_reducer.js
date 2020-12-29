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
  "Number has already been taken": "number",
  "Number , like the rent, is too damn high": "number",
  "You don't have enough money": "treasury",
};

export default playersErrorsReducer;
