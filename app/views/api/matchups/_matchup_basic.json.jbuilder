json.matchups do
  json.set! matchup.id do
    json.id matchup.id
    json.result matchup.result
    json.startPoints matchup.start_points
    json.endPoints matchup.end_points
    json.opposite matchup.opposite
  end

  json.set! matchup.opposite.id do
    json.id matchup.opposite.id
    json.result matchup.opposite.result
    json.startPoints matchup.opposite.start_points
    json.endPoints matchup.opposite.end_points
    json.opposite matchup.opposite.opposite
  end
end
