json.teams do
  json.set! @team_id do
    json.id @team.id
    json.factionId @team.faction_id
    json.teamName @team.team_name
    json.userId @team.user_id
    json.active @team.active
    json.ladder @team.ladder_name
    json.treasury @bb_team.treasury
    json.playerIds @players.order('number asc').map { |p| p.id }
  end
end

@templates.each do |template|
  json.partial! 'api/bb_player_templates/bb_player_template_details.json.jbuilder', template: template
end

@players.each do |player|
  json.partial! 'api/bb_players/bb_player_basic.json.jbuilder', player: player
end
