class UpdateFactionIds < ActiveRecord::Migration[5.2]
  Team.all.each do |t|
    f = Faction.find_by(faction_name: t.faction, ladder_name: t.ladder_name)
    t.update(faction_id: f.id) if f
  end

  Faction.find_by(faction_name: 'Transition').delete
end
