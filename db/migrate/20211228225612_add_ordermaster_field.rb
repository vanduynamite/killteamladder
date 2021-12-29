class AddOrdermasterField < ActiveRecord::Migration[5.2]
  def change
    add_column(:users, :ordermaster, :boolean, null: true, default: false)
    User.update_all(ordermaster: false)
    change_column_null(:users, :ordermaster, false)
  end
end
