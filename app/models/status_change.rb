# == Schema Information
#
# Table name: status_changes
#
#  id                   :bigint(8)              not null, primary key
#  order_item_id        :integer                not null
#  old_status_id        :integer                not null
#  new_status_id        :string                 not null
#  user_id              :integer                not null
#  created_at           :datetime               not null
#  updated_at           :datetime               not null
#

class StatusChange < ApplicationRecord
  validates :order_item_id, :old_status_id, :new_status_id, :user_id, presence: true

  belongs_to :item,
    class_name: :OrderItem,
    foreign_key: :order_item_id

  belongs_to :user

  belongs_to :old_status,
    class_name: :OrderStatus,
    foreign_key: :old_status_id

  belongs_to :new_status,
    class_name: :OrderStatus,
    foreign_key: :new_status_id

end
