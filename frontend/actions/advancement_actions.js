import * as AdvancementAPI from '../util/advancement_api_util';

export const RECEIVE_ADVANCEMENTS = 'RECEIVE_ADVANCEMENTS';
export const RECEIVE_ADVANCEMENT_ERRORS = 'RECEIVE_ADVANCEMENT_ERRORS';

export const receiveAdvancements = payload => {
  return {
    type: RECEIVE_ADVANCEMENTS,
    players: payload.players,
    advancements: payload.advancements,
    skills: payload.skills,
  };
};

export const receiveAdvancementErrors = payload => {
  return {
    type: RECEIVE_ADVANCEMENT_ERRORS,
    errors: payload.errors,
  };
};

export const getAdvancements = playerId => dispatch => {
  return AdvancementAPI.getAdvancements(playerId).then(
    payload => dispatch(receiveAdvancements(payload))
  );
};

export const newAdvancement = (advancement, historyPush) => dispatch => {
  return AdvancementAPI.newAdvancement(advancement).then(
    payload => {
      const teamId = payload.team.id;
      const ladder = payload.ladder.name;
      historyPush(`${ladder}/teamplayers/${teamId}/edit`);
    },
    errors => dispatch(receiveAdvancementErrors(errors))
  );
};
