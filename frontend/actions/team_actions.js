import * as TeamAPI from '../util/team_api_util';

export const RECEIVE_TEAMS = 'RECEIVE_TEAMS';
export const RECEIVE_TEAM_ERRORS = 'RECEIVE_TEAM_ERRORS';
export const CLEAR_TEAM_ERRORS = 'CLEAR_TEAM_ERRORS';

export const receiveTeams = ({ teams, users, matches }) => {
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
      const teamId = Object.keys(payload.teams)[0];
      const ladder = Object.values(payload.teams)[0].ladder;
      historyPush(`${ladder}/team/${teamId}`);
    },
    errors => dispatch(receiveTeamErrors(errors))
  );
};

export const editTeam = (team, historyPush) => dispatch => {
  return TeamAPI.editTeam(team).then(
    payload => {
      historyPush(`${payload[1]}/team/${payload[0]}`)
    },
    errors => dispatch(receiveTeamErrors(errors))
  );
};

export const getTeams = (ladder) => dispatch => {
  return TeamAPI.getTeams(ladder).then(
    payload => dispatch(receiveTeams(payload))
  );
};

export const getTeam = id => dispatch => {
  return TeamAPI.getTeam(id).then(
    payload => dispatch(receiveTeams(payload))
  );
};
