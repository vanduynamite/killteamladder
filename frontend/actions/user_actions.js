import * as UserAPI from '../util/user_api_util';

export const RECEIVE_USER = 'RECEIVE_USER';
export const RECEIVE_USER_ERRORS = 'RECEIVE_USER_ERRORS';

const receiveUser = ({ users, teams }) => {
  return {
    type: RECEIVE_USER,
    users,
    teams,
  }
};

export const getUser = id => dispatch => {
  return UserAPI.getUser(id).then(
    payload => dispatch(receiveUser(payload))
  )
};
