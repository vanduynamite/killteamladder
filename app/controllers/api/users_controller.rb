
class Api::UsersController < ApplicationController

  def show
    @user = User.find_by(id: params[:id])

    if @user
      render 'api/users/show.json.jbuilder'
    else
      render json: ['User id not found.'], status: 404
    end
  end

  def create
    @user = User.new(user_params)

    if @user.save
      login!(@user)
      render 'api/users/session.json.jbuilder'
    else
      render json: @user.errors.full_messages, status: 422
    end
  end

  def search
    @user = User.find_by(email: user_params[:email])

    if @user
      render 'api/users/session.json.jbuilder'
    else
      render json: ["Email not on file"], status: 400
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :password,
      :email,
    )
  end

end
