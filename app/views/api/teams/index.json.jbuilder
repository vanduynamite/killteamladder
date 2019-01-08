@teams.each do |team|
  json.partial! 'api/teams/team_basic.json.jbuilder', team: team
  json.partial! 'api/users/user_basic.json.jbuilder', user: team.user
end
