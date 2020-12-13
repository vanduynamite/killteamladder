# == Schema Information
#
# Table name: sessions
#
#  id         :bigint           not null, primary key
#  token      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  user_id    :integer          not null
#
# Indexes
#
#  index_sessions_on_token  (token)
#

class Session < ApplicationRecord
  validates :user_id, :token, presence: true
  validates :token, uniqueness: true

  belongs_to :user
  before_validation :create_token

  private

  def create_token
    self.token = Session.generate_token
  end

  def self.generate_token
    SecureRandom::urlsafe_base64
  end
  
end
