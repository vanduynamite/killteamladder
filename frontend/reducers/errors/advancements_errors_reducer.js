import {RECEIVE_ADVANCEMENTS, RECEIVE_ADVANCEMENT_ERRORS} from '../../actions/advancement_actions';
import { merge } from 'lodash';

const advancementsErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {};

  switch (action.type) {
    case RECEIVE_ADVANCEMENT_ERRORS:
      const errors = {};
      action.errors.responseJSON.map(error => errors[errorFieldMap[error]] = error);
      return merge(newState, errors);

    case RECEIVE_ADVANCEMENTS:
      return newState;

    default:
      return newState;

  }

};

// TODO: translate advancement errors
const errorFieldMap = {
  "Number has already been taken": "number",
  "Number is too high": "number",
  "You don't have enough money": "treasury",
};

export default advancementsErrorsReducer;
