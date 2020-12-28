import * as MatchAPI from '../util/match_api_util';
import { receiveTeams } from './team_actions';

export const RECEIVE_MATCH_ERRORS = 'RECEIVE_MATCH_ERRORS';
export const RECEIVE_DELETED_MATCH = 'RECEIVE_DELETED_MATCH';

const receiveMatchErrors = errors => {
  return {
    type: RECEIVE_MATCH_ERRORS,
    errors,
  };
};

const receiveDeletedMatch = payload => {
  return {
    type: RECEIVE_DELETED_MATCH,
    teamIds: payload.teamIds,
    matchIds: payload.matchIds,
  };
};

export const newMatch = (match, historyPush) => dispatch => {
  return MatchAPI.newMatch(match).then(
    payload => historyPush(`${payload[1]}/`),
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
    payload => historyPush(`${payload[1]}/team/${payload[0]}`),
    errors => dispatch(receiveMatchErrors(errors))
  );
};

export const deleteMatch = (match, historyPush) => dispatch => {
  return MatchAPI.deleteMatch(match).then(
    payload => {
      historyPush(`${payload.teamIds[2]}/team/${payload.teamIds[0]}`);
      dispatch(receiveDeletedMatch(payload));
    },
    errors => dispatch(receiveMatchErrors(errors))
  );
};
