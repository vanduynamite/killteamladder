import * as SessionAPI from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_SESSION_ERRORS';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';
export const CLEAR_SESSION_ERRORS = 'CLEAR_SESSION_ERRORS';

const receiveCurrentUser = ({ users, session }) => {
  return {
    type: RECEIVE_CURRENT_USER,
    users,
    session,
  };
};

export const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

export const clearSessionErrors = () => {
  return {
    type: CLEAR_SESSION_ERRORS,
  }
}

const removeCurrentUser = ({ users, session }) => {
  return {
    type: REMOVE_CURRENT_USER,
    users,
    session,
  };
};

export const login = user => dispatch => {
  return SessionAPI.login(user).then(
    payload => dispatch(receiveCurrentUser(payload)),
    errors => dispatch(receiveSessionErrors(errors))
  );
};

export const signup = user => dispatch => {
  return SessionAPI.signup(user).then(
    payload => dispatch(receiveCurrentUser(payload)),
    errors => dispatch(receiveSessionErrors(errors))
  );
};

export const logout = () => dispatch => {
  return SessionAPI.logout().then(
    payload => dispatch(removeCurrentUser(payload))
  );
};

export const passwordReset = user => dispatch => {
  return SessionAPI.passwordReset(user);
};
