# == Schema Information
#
# Table name: users
#
#  id         :bigint(8)        not null, primary key
#  email      :string           not null
#  pw_digest  :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#  first_name :string           not null
#  last_name  :string           not null
#

class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i

  validates :first_name, :last_name, :email, :pw_digest, presence: true
  validates :first_name, :last_name, length: { maximum: 20 }
  validates :email, :pw_digest, uniqueness: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :email, format: { with: VALID_EMAIL_REGEX, message: 'address is invalid'}

  has_many :sessions
  has_many :teams
  has_many :matches,
    through: :teams,
    source: :matchups

  attr_reader :password

  def self.find_by_credentials(email, pw)
    user = User.find_by(email: email)
    return nil unless user
    user.is_password?(pw) ? user : nil
  end

  def password=(pw)
    @password = pw
    self.pw_digest = BCrypt::Password.create(pw)
  end

  def is_password?(pw)
    BCrypt::Password.new(self.pw_digest).is_password?(pw)
  end

  def reset_session!(old_session_token = nil)
    destroy_session!(old_session_token) if old_session_token
    create_session!
  end

  def destroy_session!(old_session_token)
    self.sessions.find_by(token: old_session_token).destroy
  end

  def plays
    self.matches.where(season: Matchup.season).count
  end

  def wins
    self.matches.where(result: 1, season: Matchup.season).count
  end

  def losses
    self.matches.where(result: -1, season: Matchup.season).count
  end

  def ties
    self.matches.where(result: 0, season: Matchup.season).count
  end

  private

  def create_session!
    self.sessions.create.token
  end

end
