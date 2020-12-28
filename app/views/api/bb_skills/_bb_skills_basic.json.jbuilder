json.skills do
  json.set! skill.id do
    json.id skill.id
    json.name skill.name
    json.groupId skill.bb_skill_group_id
  end
end
