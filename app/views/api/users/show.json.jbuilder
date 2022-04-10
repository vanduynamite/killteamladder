json.partial! 'api/users/user_details.json.jbuilder', user: @user, teams: @teams, retired_teams: @retired_teams, stats: @stats

if @teams
  @teams.each do |team|
    json.partial! 'api/teams/team_basic.json.jbuilder', team: team
  end
end

if @retired_teams
  @retired_teams.each do |team|
    json.partial! 'api/teams/team_basic.json.jbuilder', team: team
  end
end
