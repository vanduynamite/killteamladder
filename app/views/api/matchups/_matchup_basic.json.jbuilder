json.matches do
  json.set! matchup.id do
    json.id matchup.id
    json.teamId matchup.team_id
    json.result matchup.result
    json.startPoints matchup.start_points
    json.endPoints matchup.end_points
    json.date matchup.created_at
    json.opposingMatchId matchup.matchup_id
    json.opposingTeamId matchup.opposite_matchup.team_id
    json.oppStartPoints matchup.opposite_matchup.start_points
    json.oppEndPoints matchup.opposite_matchup.end_points
  end
end
