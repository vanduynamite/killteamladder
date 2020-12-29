json.partial! 'api/bb_players/bb_player_basic.json.jbuilder', player: @player
json.partial! 'api/bb_player_templates/bb_player_template_details.json.jbuilder', template: @template

json.team do
  json.id @player.team_id
end

json.ladder do
  json.name @player.team.ladder.name
end

json.teams do
  json.set! @team.id do
    json.id @team.id
    json.playerIds @team.players.order('number asc').map { |p| p.id }
  end
end
