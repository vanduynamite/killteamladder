
export const getPlayer = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/bb_players/${id}`,
  });
};

export const getPlayersAndTemplates = teamId => {
  return $.ajax({
    method: 'GET',
    url: `/api/bb_team_templates/${teamId}`,
  });
};

export const editPlayer = player => {
  // adjust values as needed
  return $.ajax({
    method: 'PATCH',
    url: `/api/bb_players/${id}`,
    data: { player },
  });
};

export const newPlayer = (teamId, templateId) => {
  return $.ajax({
    method: 'POST',
    url: '/api/bb_players',
    data: {
      team_id: teamId,
      template_id: templateId,
    },
  });
};
