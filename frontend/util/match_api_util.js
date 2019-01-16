
export const newMatch = match => {

  match.team_id = match.teamId;
  match.opponent_team_id = match.opponentTeamId;

  return $.ajax({
    method: 'POST',
    url: '/api/matchups',
    data: { matchup: match },
  });
};

export const getMatch = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/matchups/${id}`,
  });
};

export const editMatch = match => {
  return $.ajax({
    method: 'PATCH',
    url: `/api/matchups/${match.id}`,
    data: { matchup: match },
  });
};

export const deleteMatch = match => {
  return $.ajax({
    method: 'DELETE',
    url: `/api/matchups/${match.id}`,
  });
};
