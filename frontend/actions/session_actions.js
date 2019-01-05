import * as SessionAPI from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = 'RECEIVE_CURRENT_USER';
export const LOGOUT_CURRENT_USER = 'LOGOUT_CURRENT_USER';
export const RECEIVE_SESSION_ERRORS = 'RECEIVE_ERRORS';
export const REMOVE_CURRENT_USER = 'REMOVE_CURRENT_USER';

const receiveCurrentUser = ({ users, session }) => {
  return {
    type: RECEIVE_CURRENT_USER,
    users,
    session,
  };
};

const receiveSessionErrors = errors => {
  return {
    type: RECEIVE_SESSION_ERRORS,
    errors,
  };
};

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

export const demoLogin = () => dispatch => {
  const user = {
    email: 'paul.vanduyn@gmail.com',
    password: 'emperorprotects',
  };
  return dispatch(login(user));
};
