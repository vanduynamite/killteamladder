json.advancements do
  json.set! advancement.id do
    json.id advancement.id
    json.name advancement.name
    json.rank advancement.rank
    json.spp_cost advancement.spp_cost
    json.value_increase advancement.value_increase
  end
end
