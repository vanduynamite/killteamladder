
export const newMatch = match => {

  // opponent_team_id
  // team_id
  // result

  return $.ajax({
    method: 'POST',
    url: '/api/matchups',
    data: { match },
  });
};
