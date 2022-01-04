class AddCompleteFlagToStatuses < ActiveRecord::Migration[5.2]
  def change
    add_column(:order_statuses, :complete, :boolean, null: true, default: false)
    OrderStatus.update_all(complete: false)
    change_column_null(:order_statuses, :complete, false)
  end
end
