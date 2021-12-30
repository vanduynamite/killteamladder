class ChangeItemIdFieldOnOrderItem < ActiveRecord::Migration[5.2]
  def change
    remove_column(:order_items, :item_id)
    add_column(:order_items, :item_code, :string)
  end
end
