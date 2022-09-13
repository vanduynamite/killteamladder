class AddAuthFieldsToApprovedEmail < ActiveRecord::Migration[5.2]
  def change
    add_column(:approved_emails, :member, :boolean, null: true, default: false)
    add_column(:approved_emails, :admin, :boolean, null: true, default: false)
    add_column(:approved_emails, :order, :boolean, null: true, default: false)
    add_column(:approved_emails, :ordermaster, :boolean, null: true, default: false)
    add_column(:approved_emails, :unpacker, :boolean, null: true, default: false)
    add_column(:approved_emails, :ladder_admin, :boolean, null: true, default: false)
    add_column(:approved_emails, :ladder_40k, :boolean, null: true, default: false)

    ApprovedEmail.update_all(
      member: false,
      admin: false,
      order: false,
      ordermaster: false,
      unpacker: false,
      ladder_admin: false,
      ladder_40k: false,
    )

    change_column_null(:approved_emails, :member, false)
    change_column_null(:approved_emails, :admin, false)
    change_column_null(:approved_emails, :order, false)
    change_column_null(:approved_emails, :ordermaster, false)
    change_column_null(:approved_emails, :unpacker, false)
    change_column_null(:approved_emails, :ladder_admin, false)
    change_column_null(:approved_emails, :ladder_40k, false)
  end
end
