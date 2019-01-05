class CreateApprovedEmails < ActiveRecord::Migration[5.2]
  def change
    create_table :approved_emails do |t|
      t.string :email, null: false
      
      t.timestamps
    end
  end
end
