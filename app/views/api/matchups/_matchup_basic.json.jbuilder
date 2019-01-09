json.matches do
  json.set! matchup.id do
    json.id matchup.id
    json.result matchup.result
    json.startPoints matchup.start_points
    json.endPoints matchup.end_points
    json.date matchup.created_at
    json.opposingTeamId matchup.opposite_matchup.team_id
  end
end
