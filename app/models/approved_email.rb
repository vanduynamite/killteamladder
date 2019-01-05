# == Schema Information
#
# Table name: approved_emails
#
#  id         :bigint(8)        not null, primary key
#  email      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class ApprovedEmail < ApplicationRecord
  validates :email, presence: true, uniqueness: true

end
