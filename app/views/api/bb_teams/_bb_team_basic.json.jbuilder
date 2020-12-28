json.teams do
  json.set! team.team_id do
    json.apothecaries team.apothecaries
    json.assistant_coaches team.assistant_coaches
    json.cheerleaders team.cheerleaders
    json.currentTeamValue team.current_team_value
    json.dedicatedFans team.dedicated_fans
    json.rerolls team.rerolls
    json.teamValue team.team_value
    json.treasury team.treasury
  end
end
