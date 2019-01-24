
class Api::ApprovedEmailController < ApplicationController

  ADMINS = [
    'paul.vanduyn@gmail.com',
    'isaac.vanduyn@gmail.com',
  ]

  def create
    return false unless admin_user?

    approved_email = ApprovedEmail.new(email: user_params[:email])

    if approved_email.save
      render json: ["Approved Email (#{approved_email.email}) added"], status: 200
    else
      render json: approved_email.errors.full_messages, status: 422
    end
  end

  def destroy
    return false unless admin_user?

    # approved_email = ApprovedEmail.find_by(email: params[:id])
    approved_email = ApprovedEmail.find_by(email: user_params[:email])

    if approved_email
      if approved_email.destroy
        render json: ["Approved Email (#{approved_email.email}) destroyed"], status: 200
      else
        render json: ['Email found but error in destroying'], status: 422
      end
    else
      render json: ['Email not found.'], status: 404
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :email,
    )
  end

  def admin_user?
    unless logged_in? && ADMINS.include?(current_user.email)
      render json: ['What are you trying to pull?'], status: 401
      return false
    end
    true
  end

end
