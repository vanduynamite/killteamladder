import * as UserAPI from '../util/user_api_util';
import receiveSessionErrors from './session_actions';

export const RECEIVE_USERS = 'RECEIVE_USERS';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

const receiveUsers = ({ users, teams }) => {
  return {
    type: RECEIVE_USERS,
    users,
    teams,
  }
};

export const getUser = id => dispatch => {
  return UserAPI.getUser(id).then(
    payload => dispatch(receiveUsers(payload))
  );
};

export const editUser = user => dispatch => {
  return UserAPI.editUser(user).then(
    payload => historyPush('/account'),
    errors => dispatch(receiveSessionErrors(errors)),
  )
}
