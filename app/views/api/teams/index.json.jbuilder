@teams.each do |team|
  json.partial! 'api/teams/team.json.jbuilder', team: team
  json.partial! 'api/users/user.json.jbuilder', user: team.user
end
