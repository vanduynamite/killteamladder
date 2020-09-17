
class Api::UsersController < ApplicationController

  def show
    @user = User.find_by(id: params[:id])
    @teams = @user.teams.where(active: true, ladder_name: params[:ladder])
    @retired_teams = @user.teams.where(active: false, ladder_name: params[:ladder])
    @rankings = get_rankings(params[:ladder])
    @stats = @user.stats(params[:ladder])

    if @user
      render 'api/users/show.json.jbuilder'
    else
      render json: ['User id not found.'], status: 404
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save

      approved = ApprovedEmail.find_by(email: user_params[:email])
      unless approved
        render json: ['Account created and pending approval. Please contact a Carcosa officer.'], status: 401
        return
      end

      login!(@user)
      render 'api/users/session.json.jbuilder'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def update
    return false unless authorized_user?(params[:id].to_i)
    @user = User.find_by(id: params[:id])

    if @user.update(user_params)
      render json: [@user.id], status: 200
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def password_reset
    return false unless admin_user?
    user = User.find_by(email: user_params[:email])
    if user
      new_password = user.reset_password!
      render json: [new_password], status: 200
    else
      render json: ["Email address #{user_params[:email]} not found"], status: 422
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :first_name,
      :last_name,
      :email,
      :password,
      :authorized_2020_league,
    )
  end

end
