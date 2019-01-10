import * as MatchAPI from '../util/match_api_util';

export const RECEIVE_MATCH_ERRORS = 'RECEIVE_MATCH_ERRORS';

const receiveMatchErrors = errors => {
  return {
    type: RECEIVE_MATCH_ERRORS,
    errors,
  };
};

export const newMatch = (match, historyPush) => dispatch => {
  return MatchAPI.newMatch(match).then(
    payload => historyPush('/'),
    errors => dispatch(receiveMatchErrors(errors))
  );
};
