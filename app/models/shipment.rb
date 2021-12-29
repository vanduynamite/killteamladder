# == Schema Information
#
# Table name: shipments
#
#  id                   :bigint(8)              not null, primary key
#  tracking_num         :string
#  distributor_id       :integer                not null
#  distributor_invoice  :string
#  received             :datetime
#  created_at           :datetime               not null
#  updated_at           :datetime               not null
#

class Shipment < ApplicationRecord
  validates :distributor_id, presence: true

  belongs_to :distributor

  has_many :items,
    class_name: :OrderItem

end
