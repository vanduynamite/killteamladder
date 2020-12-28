json.advancements do
  json.set! advancement.id do
    json.id advancement.id
    json.name advancement.name
    json.rank advancement.rank
    json.sppCost advancement.spp_cost
    json.valueIncrease advancement.value_increase
    json.statUpgrade advancement.stat_upgrade
    json.requiresSkillId advancement.requires_skill_id
    json.random advancement.random
    json.primarySkill advancement.primary_skill
  end
end
