# == Schema Information
#
# Table name: order_statuses
#
#  id         :bigint(8)              not null, primary key
#  name       :string                 not null
#  sort_num   :integer                not null
#  user_visible      :boolean         not null, default true
#  item_cancelable   :boolean         not null, default false
#  created_at :datetime               not null
#  updated_at :datetime               not null
#

class OrderStatus < ApplicationRecord
  validates :name, :sort_num, :user_visible, :item_cancelable, presence: true
  validates :name, :sort_num, uniqueness: true

end
