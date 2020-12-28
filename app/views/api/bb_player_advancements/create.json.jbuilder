json.team do
  json.id @player.team_id
end

json.ladder do
  json.name @player.team.ladder.name
end
