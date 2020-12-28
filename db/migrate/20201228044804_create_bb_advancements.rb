class CreateBbAdvancements < ActiveRecord::Migration[5.2]
  def change
    create_table :bb_advancements do |t|
      t.string :name, null: false
      t.integer :rank, null: false
      t.integer :spp_cost, null: false
      t.integer :value_increase, null: false

      t.timestamps
    end

    create_table :bb_player_advancements do |t|
      t.integer :bb_player_id, null: false
      t.integer :bb_advancement_id, null: false
      t.integer :bb_skill_id

      t.timestamps
    end
  end
end
