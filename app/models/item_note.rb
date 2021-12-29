# == Schema Information
#
# Table name: item_notes
#
#  id                 :bigint(8)              not null, primary key
#  order_item_id      :string                 not null
#  note               :string                 not null
#  created_at         :datetime               not null
#  updated_at         :datetime               not null
#

class ItemNote < ApplicationRecord
  validates :order_item_id, :note, presence: true

  belongs_to :order_item
  belongs_to :user

end
