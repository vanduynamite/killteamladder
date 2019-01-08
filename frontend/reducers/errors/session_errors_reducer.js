import {
  RECEIVE_SESSION_ERRORS,
  RECEIVE_CURRENT_USER
} from '../../actions/session_actions';
import { merge } from 'lodash';

const sessionErrorsReducer = (state = {}, action) => {
  Object.freeze(state);
  const newState = {};

  switch (action.type) {
    case RECEIVE_SESSION_ERRORS:
      const errors = {};
      action.errors.responseJSON.map(error => errors[errorFieldMap[error]] = error);
      return merge(newState, errors);

    case RECEIVE_CURRENT_USER:
      return newState;

    default:
      return newState;

  }

};

const errorFieldMap = {
  "First name can't be blank": "firstName",
  "Last name can't be blank": "lastName",
  "Email can't be blank": "email",
  "Email has already been taken": "email",
  "Email address is invalid" : "email",
  "Password and email do not match": "password",
  "Password is too short (minimum is 6 characters)": "password",
  "Passwords do not match": "password",
  "First name is too long (maximum is 20 characters)": "firstName",
  "Last name is too long (maximum is 20 characters)": "lastName",
};

export default sessionErrorsReducer;

// ["Incorrect username or password"],
