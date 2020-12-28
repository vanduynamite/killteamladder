
export const getAdvancements = playerId => {
  return $.ajax({
    method: 'GET',
    url: `/api/bb_player_advancements`,
    data: { bb_player_id: playerId }
  });
};

export const newAdvancement = advancement => {
  advancement.advancement_id = advancement.id;
  advancement.bb_skill_id = advancement.skill_id;
  advancement.bb_player_id = advancement.playerId;
  return $.ajax({
    method: 'POST',
    url: '/api/bb_player_advancements',
    data: { advancement },
  });
};
