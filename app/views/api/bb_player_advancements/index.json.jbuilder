@advancements.each do |advancement|
  json.partial! 'api/bb_player_advancements/bb_player_advancements_basic.json.jbuilder', advancement: advancement
end

json.partial! 'api/bb_players/bb_player_basic.json.jbuilder', player: @player

json.players do
  json.set! @player.id do
    json.id @player.id
    json.primarySkillGroups @player.primary_skill_groups.map{ |g| {id: g.id, name: g.name} }
    json.secondarySkillGroups @player.secondary_skill_groups.map{ |g| {id: g.id, name: g.name} }
    json.primarySkills @player.primary_skills.map{ |s| s.id }
    json.secondarySkills @player.secondary_skills.map{ |s| s.id }
  end
end

@player.primary_skills.each do |skill|
  json.partial! 'api/bb_skills/bb_skills_basic.json.jbuilder', skill: skill
end

@player.secondary_skills.each do |skill|
  json.partial! 'api/bb_skills/bb_skills_basic.json.jbuilder', skill: skill
end
