# == Schema Information
#
# Table name: distributors
#
#  id         :bigint(8)              not null, primary key
#  name       :string                 not null
#  seach_name :string
#  created_at :datetime               not null
#  updated_at :datetime               not null
#

class Distributor < ApplicationRecord
  validates :name, presence: true
  validates :name, uniqueness: true
  validates :search_name, presence: true
  validates :search_name, uniqueness: true

  has_many :items,
    class_name: :OrderItem

end
