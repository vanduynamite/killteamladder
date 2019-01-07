json.partial! 'api/users/user.json.jbuilder', user: @user

@teams.each do |team|
  json.partial! 'api/teams/team.json.jbuilder', team: team
end
