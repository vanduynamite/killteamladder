# == Schema Information
#
# Table name: users
#
#  id                     :bigint(8)              not null, primary key
#  email                  :string                 not null
#  pw_digest              :string                 not null
#  created_at             :datetime               not null
#  updated_at             :datetime               not null
#  first_name             :string                 not null
#  last_name              :string                 not null
#  authorized_2020_league :boolean                not null
#  admin                  :boolean                not null
#  ordermaster            :boolean                default: false
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

  has_many :items,
    class_name: :OrderItem

  has_many :item_notes

  has_many :notes_on_items,
    through: :items,
    source: :notes

  has_many :status_changes_on_items,
    through: :items,
    source: :status_changes

  has_one :permissions,
    class_name: :ApprovedEmail,
    foreign_key: :email,
    primary_key: :email
    
  attr_reader :password

  def self.find_by_credentials(email, pw)
    # user = User.find_by(email: email)
    user = User.where('lower(email) = ?', email.downcase).first
    return nil unless user
    user.is_password?(pw) ? user : nil
  end

  def password=(pw)
    @password = pw
    self.pw_digest = BCrypt::Password.create(pw)
  end

  def reset_password!
    new_password = SecureRandom::urlsafe_base64(6)
    self.password = new_password
    self.save
    new_password
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

  def stats(ladder)
    current_season_num = Season.where(ladder_name: ladder).last.season
    all_matches = self.matches.where(season: current_season_num).includes(:ladder)
    results = {
      matchesPlayed: 0,
      matchesWon: 0,
      matchesTied: 0,
      matchesLost: 0,
    }

    all_matches.each do |match|
      if match.ladder.name == ladder
        results[:matchesPlayed] += 1
        results[:matchesWon] += 1 if match.result == 1
        results[:matchesTied] += 1 if match.result == 0
        results[:matchesLost] += 1 if match.result == -1
      end
    end

    results
  end

  def order_stats
    items = self.items

    search_array = [
      "new",
      "invoiced",
      "ordered",
      "shipped",
      "issue",
    ]

    results = {}

    search_array.each do |name|
      status_array = OrderStatus.public_send(name + "_statuses")
      item_count = items.where(status: OrderStatus.where(search_name: status_array)).count
      results[name + "Items"] = item_count
    end

    results
  end

  private

  def create_session!
    self.sessions.create.token
  end

end
