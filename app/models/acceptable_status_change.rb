# == Schema Information
#
# Table name: acceptable_status_changes
#
#  id                     :bigint(8)         not null, primary key
#  order_status_id_from   :integer           not null
#  order_status_id_to     :integer           not null
#  ordermaster_only       :boolean           not null, default false
#

class AcceptableStatusChange < ApplicationRecord
  validates :order_status_id_from, :order_status_id_to, presence: true

  belongs_to :change_from,
    class_name: :OrderStatus,
    foreign_key: :order_status_id_from

  belongs_to :change_to,
    class_name: :OrderStatus,
    foreign_key: :order_status_id_to

end
