
class UserMailer < ApplicationMailer

  def password_reset_email
    @user = params[:user]
    @new_password = params[:new_password]

    mail(
      from: "carcosaclub+passwordreset@gmail.com",
      to: @user.email, 
      subject: "Carcosa portal password reset",
    )
  end

end
