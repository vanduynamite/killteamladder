# == Schema Information
#
# Table name: order_statuses
#
#  id                :bigint(8)              not null, primary key
#  name              :string                 not null
#  search_name       :string                 not null
#  sort_num          :integer                not null
#  user_visible      :boolean                not null, default true
#  item_cancelable   :boolean                not null, default false
#  created_at        :datetime               not null
#  updated_at        :datetime               not null
#

class OrderStatus < ApplicationRecord
  validates :name, :search_name, :sort_num, presence: true
  validates :name, :search_name, :sort_num, uniqueness: true

  has_many :order_items,
    class_name: :OrderItem,
    foreign_key: :status_id

  has_many :acceptable_status_change_links,
    class_name: :AcceptableStatusChange,
    foreign_key: :order_status_id_from

  has_many :acceptable_status_changes,
    through: :acceptable_status_change_links,
    source: :change_to

end
