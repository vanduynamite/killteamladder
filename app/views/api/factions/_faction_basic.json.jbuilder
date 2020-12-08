json.factions do
  json.set! faction.id do
    json.id faction.id
    json.faction_name faction.faction_name
    json.ladder faction.ladder_name
  end
end
