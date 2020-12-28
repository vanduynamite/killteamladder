json.factions do
  json.set! faction.id do
    json.id faction.id
    json.factionName faction.faction_name
    json.ladder faction.ladder_name
  end
end
