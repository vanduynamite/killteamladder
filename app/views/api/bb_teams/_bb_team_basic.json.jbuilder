json.teams do
  json.set! team.team_id do
    json.apothecaries team.apothecaries
    json.assistant_coaches team.assistant_coaches
    json.cheerleaders team.cheerleaders
    json.current_team_value team.current_team_value
    json.dedicated_fans team.dedicated_fans
    json.rerolls team.rerolls
    json.team_value team.team_value
    json.treasury team.treasury
  end
end
