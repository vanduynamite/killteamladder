# == Schema Information
#
# Table name: approved_emails
#
#  id         :bigint(8)        not null, primary key
#  email      :string           not null
#  member     :boolean          not null
#  admin      :boolean          not null
#  order      :boolean          not null
#  unpacker   :boolean          not null
#  ladder_40k :boolean          not null
#  ordermaster      :boolean          not null
#  ladder_admin     :boolean          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ApprovedEmail < ApplicationRecord
  validates :email, presence: true, uniqueness: true

end
