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

# TODO: Gotta do a similar thing here to cut down the queries
if @players
  @players.each do |player|
    json.partial! 'api/bb_players/bb_player_basic.json.jbuilder', player: player
  end
end
