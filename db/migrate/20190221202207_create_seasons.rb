class CreateSeasons < ActiveRecord::Migration[5.2]
  def change
    create_table :seasons do |t|
      t.integer :season, null: false

      t.timestamps
    end
  end
end
