json.advancements do
  json.set! advancement.id do
    json.id advancement.id
    json.name advancement.name
    json.rank advancement.rank
    json.sppCost advancement.spp_cost
    json.valueIncrease advancement.value_increase
  end
end
