json.partial! 'api/users/user_details.json.jbuilder', user: @user, teams: @teams

@teams.each do |team|
  json.partial! 'api/teams/team_basic.json.jbuilder', team: team
end
