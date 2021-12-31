# == Schema Information
#
# Table name: invoices
#
#  id              :bigint(8)              not null, primary key
#  carcosa_id      :string                 not null
#  square_id       :string
#  created_at      :datetime               not null
#  updated_at      :datetime               not null
#

class Invoice < ApplicationRecord
  validates :carcosa_id, presence: true
  validates :carcosa_id, uniqueness: true

  has_many :items,
    class_name: :OrderItem

end
