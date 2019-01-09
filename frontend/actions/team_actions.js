import * as TeamAPI from '../util/team_api_util';

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
export const RECEIVE_TEAM_ERRORS = 'RECEIVE_TEAM_ERRORS';
export const CLEAR_TEAM_ERRORS = 'CLEAR_TEAM_ERRORS';

const receiveTeams = ({ teams, users, matches }) => {
  return {
    type: RECEIVE_TEAMS,
    teams,
    users,
    matches,
  }
}

const receiveTeamErrors = errors => {
  return {
    type: RECEIVE_TEAM_ERRORS,
    errors,
  };
};

export const clearTeamErrors = () => {
  return {
    type: CLEAR_TEAM_ERRORS,
  }
}



export const newTeam = (team, historyPush) => dispatch => {
  return TeamAPI.newTeam(team).then(
    payload => {
      dispatch(receiveTeams(payload));
      historyPush('/account');
    },
    errors => dispatch(receiveTeamErrors(errors))
  );
};

export const getTeams = () => dispatch => {
  return TeamAPI.getTeams().then(
    payload => dispatch(receiveTeams(payload))
  );
};

export const getTeam = id => dispatch => {
  return TeamAPI.getTeam(id).then(
    payload => dispatch(receiveTeams(payload))
  );
};
