
export const newMatch = match => {

  match.team_id = match.teamId;
  match.opponent_team_id = match.opponentTeamId;

  console.log(match);

  return $.ajax({
    method: 'POST',
    url: '/api/matchups',
    data: { matchup: match },
  });
};
