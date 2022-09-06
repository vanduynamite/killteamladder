class AddDailyEmailOptionToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column(:users, :receive_daily_email, :boolean, null: true, default: false)
    User.update_all(receive_daily_email: false)
    change_column_null(:users, :receive_daily_email, false)
  end
end
