
# figure out how many of this template are allowed on the team
non_group_allowed = template.max_allowed - @players.where(
  team_id: @team_id,
  bb_player_template_id: template.id,
).count

position_group = template.position_group
if !position_group
  allowed = non_group_allowed
else
  grouped_player_template_ids = position_group.grouped_player_template_ids

  group_allowed = player_template.group_max_allowed - @players.where(
    team_id: @team_id,
    bb_player_template_id: (grouped_player_template_ids)
  ).count

  allowed = [non_group_allowed, group_allowed].min
end

json.teams do
  json.set! @team_id do
    json.templates do
      json.set! template.id do
        json.id template.id
        json.allowed allowed
      end
    end
  end
end

json.templates do
  json.set! template.id do
    json.id template.id
    json.position_name template.position_name
    json.cost template.cost
    json.ma template.ma
    json.st template.st
    json.ag template.ag
    json.pa template.pa
    json.av template.av
    json.skills template.skill_string
    json.psg template.primary_skill_group_string
    json.ssg template.secondary_skill_group_string
    json.allowed allowed
  end
end
