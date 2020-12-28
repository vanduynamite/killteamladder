
export const getAdvancements = playerId => {
  return $.ajax({
    method: 'GET',
    url: `/api/bb_player_advancements`,
    data: { bb_player_id: playerId }
  });
};

export const newAdvancement = advancement => {
  advancement.bb_advancement_id = advancement.advancementId;
  advancement.bb_player_id = advancement.playerId;
  advancement.bb_skill_id = advancement.skillId;
  return $.ajax({
    method: 'POST',
    url: '/api/bb_player_advancements',
    data: { advancement },
  });
};
