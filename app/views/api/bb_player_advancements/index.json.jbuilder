@advancements.each do |advancement|
  json.partial! 'api/bb_player_advancements/bb_player_advancements_basic.json.jbuilder', advancement: advancement
end

json.partial! 'api/bb_players/bb_player_basic.json.jbuilder', player: @player
