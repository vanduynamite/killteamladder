import * as UserAPI from '../util/user_api_util';
import { receiveSessionErrors } from './session_actions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

const receiveUsers = payload => {
  return {
    type: RECEIVE_USERS,
    users: payload.users,
    teams: payload.teams,
  };
};

export const getUser = (id, ladder) => dispatch => {
  return UserAPI.getUser(id, ladder).then(
    payload => dispatch(receiveUsers(payload))
  );
};

export const editUser = (user, historyPush, ladder) => dispatch => {
  return UserAPI.editUser(user).then(
    payload => historyPush(`${ladder}/account`),
    errors => dispatch(receiveSessionErrors(errors))
  );
};
