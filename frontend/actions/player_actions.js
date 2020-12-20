import * as PlayerAPI from '../util/player_api_util';

export const RECEIVE_PLAYER = 'RECEIVE_PLAYER';
export const RECEIVE_PLAYERS = 'RECEIVE_PLAYERS';
export const RECEIVE_PLAYER_ERRORS = 'RECEIVE_PLAYER_ERRORS';

export const receivePlayers = ({ players, templates, teams }) => {
  return {
    type: RECEIVE_PLAYERS,
    players,
    templates,
    teams,
  }
};

export const receivePlayer = player => {
  return {
    type: RECEIVE_PLAYER,
    player,
  }
};

const receiverPlayerErrors = ({ errors }) => {
  return {
    type: RECEIVE_PLAYER_ERRORS,
    errors,
  }
};

export const getPlayer = id => dispatch => {
  return PlayerAPI.getPlayer(id).then(
    payload => dispatch(receivePlayer(payload))
  );
};

export const getPlayersAndTemplates = (teamId, ladder) => dispatch => {
  return PlayerAPI.getPlayersAndTemplates(teamId, ladder).then(
    payload => dispatch(receivePlayers(payload))
  );
};

export const editPlayer = (player, historyPush, ladder) => dispatch => {
  return PlayerAPI.editPlayer(player).then(
    payload => {
      const teamId = payload[0];
      const ladder = payload[1];
      historyPush(`${ladder}/teamplayers/${teamId}`);
    },
    errors => dispatch(receivePlayerErrors(errors))
  );
};

export const newPlayer = (teamId, templateId) => dispatch => {
  return PlayerAPI.newPlayer(teamId, templateId).then(
    payload => {
      dispatch(receivePlayers(payload));
      // might have an issue here with teamId
      // I suspect it's closed over the value but maybe not
      historyPush(`${ladder}/teamplayers/${teamId}`);
    },
    errors => dispatch(receivePlayerErrors(errors))
  );
};
