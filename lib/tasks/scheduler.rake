
desc "Sends daily updates to users"
task send_daily_updates: :environment do
  users = User.where(receive_daily_email: true)
  users.each do |user|
    OrderMailer.with(user: user).daily_update_email.deliver_now
  end
end
