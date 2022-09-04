# Preview all emails at http://localhost:3000/rails/mailers/user_mailer
class UserMailerPreview < ActionMailer::Preview

  def password_reset_email
    user = User.new(
      email: "whatever@buttever.com"
    )

    new_password = "generatedpassword"

    UserMailer.with(
      user: user, 
      new_password: new_password,
    ).password_reset_email
  end

end
