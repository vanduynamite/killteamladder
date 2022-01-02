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
  validates :carcosa_id, presence: { message: 'number can\'t be blank' }
  validates :carcosa_id, uniqueness: { message: 'number has already been taken' }

  has_many :items,
    class_name: :OrderItem

end
