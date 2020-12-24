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

export const getPlayersAndTemplates = teamId => dispatch => {
  return PlayerAPI.getPlayersAndTemplates(teamId).then(
    payload => dispatch(receivePlayers(payload))
  );
};

export const editPlayer = (player, historyPush) => dispatch => {
  return PlayerAPI.editPlayer(player).then(
    payload => {
      const teamId = payload[0];
      const ladder = payload[1];
      historyPush(`${ladder}/teamplayers/${teamId}`);
    },
    errors => dispatch(receivePlayerErrors(errors))
  );
};

export const newPlayer = player => dispatch => {
  return PlayerAPI.newPlayer(player).then(
    payload => {
      dispatch(receivePlayers(payload));
      // TODO: need to get the team Id from the payload
      // might have an issue here with teamId
      historyPush(`${ladder}/teamplayers/${teamId}`);
    },
    errors => dispatch(receivePlayerErrors(errors))
  );
};
