@teams.each do |team|
  json.partial! 'api/teams/team_basic.json.jbuilder', team: team
end

@users.each do |user|
  json.partial! 'api/users/user_basic.json.jbuilder', user: user
end

json.partial! 'api/teams/team_details.json.jbuilder', team: @team

@matchups.each do |matchup|
  json.partial! 'api/matchups/matchup_basic.json.jbuilder', matchup: matchup
end
