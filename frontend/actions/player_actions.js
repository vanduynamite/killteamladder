import * as PlayerAPI from '../util/player_api_util';

export const RECEIVE_PLAYER = 'RECEIVE_PLAYER';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
export const RECEIVE_PLAYER_ERRORS = 'RECEIVE_PLAYER_ERRORS';

export const receivePlayers = payload => {
  return {
    type: RECEIVE_PLAYERS,
    players: payload.players,
    templates: payload.templates,
    teams: payload.teams,
  };
};

export const receivePlayer = player => {
  return {
    type: RECEIVE_PLAYER,
    player,
  };
};

const receivePlayerErrors = errors => {
  return {
    type: RECEIVE_PLAYER_ERRORS,
    errors,
  };
};

export const getPlayer = id => dispatch => {
  return PlayerAPI.getPlayer(id).then(
    payload => dispatch(receivePlayer(payload))
  );
};

export const getPlayersAndTemplates = teamId => dispatch => {
  return PlayerAPI.getPlayersAndTemplates(teamId).then(
    payload => dispatch(receivePlayers(payload))
  );
};

export const editPlayer = (player, historyPush) => dispatch => {
  return PlayerAPI.editPlayer(player).then(
    payload => {
      dispatch(receivePlayers(payload));
      const teamId = payload.team.id;
      const ladder = payload.ladder.name;
      historyPush(`${ladder}/teamplayers/${teamId}/edit`);
    },
    errors => dispatch(receivePlayerErrors(errors))
  );
};

export const newPlayer = (player, historyPush) => dispatch => {
  return PlayerAPI.newPlayer(player).then(
    payload => {
      dispatch(receivePlayers(payload));
      const teamId = payload.team.id;
      const ladder = payload.ladder.name;
      historyPush(`${ladder}/teamplayers/${teamId}/edit`);
    },
    errors => dispatch(receivePlayerErrors(errors))
  );
};
