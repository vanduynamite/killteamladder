import * as AdvancementAPI from '../util/advancement_api_util';

export const RECEIVE_ADVANCEMENTS = 'RECEIVE_ADVANCEMENTS';

export const receiveAdvancements = payload => {
  return {
    type: RECEIVE_ADVANCEMENTS,
    players: payload.players,
    advancements: payload.advancements,
  };
};

export const getAdvancements = playerId => dispatch => {
  return AdvancementAPI.getAdvancements(playerId).then(
    payload => dispatch(receiveAdvancements(payload))
  );
};

export const newPlayer = (advancement, historyPush) => dispatch => {
  return AdvancementAPI.newAdvancement(advancement).then(
    payload => {
      return;
      // dispatch(receiveAdvancements(payload));
      // const teamId = payload.team.id;
      // const ladder = payload.ladder.name;
      // historyPush(`${ladder}/teamplayers/${teamId}/edit`);
    }
    // errors => dispatch(receivePlayerErrors(errors))
  );
};
