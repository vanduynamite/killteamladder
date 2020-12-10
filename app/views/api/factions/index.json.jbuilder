@factions.each do |faction|
  json.partial! 'api/factions/faction_basic.json.jbuilder', faction: faction
end
