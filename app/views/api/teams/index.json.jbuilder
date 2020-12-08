@teams.each do |team|
  json.partial! 'api/teams/team_basic.json.jbuilder', team: team
  json.partial! 'api/users/user_basic.json.jbuilder', user: team.user
  json.partial! 'api/factions/faction_basic.json.jbuilder', faction: team.faction_record
end
