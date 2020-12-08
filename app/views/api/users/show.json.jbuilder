json.partial! 'api/users/user_details.json.jbuilder', user: @user, teams: @teams, retired_teams: @retired_teams, stats: @stats

@teams.each do |team|
  json.partial! 'api/teams/team_basic.json.jbuilder', team: team
  json.partial! 'api/factions/faction_basic.json.jbuilder', faction: team.faction_record
end

@retired_teams.each do |team|
  json.partial! 'api/teams/team_basic.json.jbuilder', team: team
end
