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
  "This is the wrong rank advancement for this player": "advancementId",
  "St improvement cannot be more than +2": "characteristicId",
  "Ma improvement cannot be more than +2": "characteristicId",
  "Ag improvement cannot be more than +2": "characteristicId",
  "Pa improvement cannot be more than +2": "characteristicId",
  "Av improvement cannot be more than +2": "characteristicId",
  "You need to include a skill. Please refresh the page and try again.": "skillId",
  "Bb player already has this skill": "skillId",
};

export default advancementsErrorsReducer;
