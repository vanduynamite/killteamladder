json.team do
  json.id @player.team_id
end

json.ladder do
  json.name @player.team.ladder.name
end

json.partial! 'api/bb_players/bb_player_basic.json.jbuilder', player: @player
