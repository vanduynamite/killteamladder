import * as MatchAPI from '../util/match_api_util';
import { receiveTeams } from './team_actions';

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

export const getMatch = id => dispatch => {
  return MatchAPI.getMatch(id).then(
    payload => dispatch(receiveTeams(payload))
  );
};

export const editMatch = (match, historyPush) => dispatch => {
  return MatchAPI.editMatch(match).then(
    payload => historyPush(`/team/${payload[0]}`),
    errors => dispatch(receiveMatchErrors(errors))
  );
};
