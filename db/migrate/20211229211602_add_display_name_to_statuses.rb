class AddDisplayNameToStatuses < ActiveRecord::Migration[5.2]
  def change
    add_column(:order_statuses, :search_name, :string, null: false)
  end
end
