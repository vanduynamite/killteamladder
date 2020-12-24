
export const getPlayer = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/bb_players/${id}`,
  });
};

export const getPlayersAndTemplates = teamId => {
  return $.ajax({
    method: 'GET',
    url: `/api/bb_teams/${teamId}`,
  });
};

export const editPlayer = player => {
  const id = player.id;
  return $.ajax({
    method: 'PATCH',
    url: `/api/bb_players/${id}`,
    data: { player },
  });
};

export const newPlayer = player => {
  player.team_id = player.teamId;
  player.bb_player_template_id = player.templateId;
  return $.ajax({
    method: 'POST',
    url: '/api/bb_players',
    data: { player },
  });
};
