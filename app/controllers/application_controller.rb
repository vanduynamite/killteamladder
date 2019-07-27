
class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  helper_method :logged_in?, :current_user

  private

  ADMINS = [
    'paul.vanduyn@gmail.com',
    'isaac.vanduyn@gmail.com',
  ]

  def current_user
    current_session = Session.find_by(token: session[:session_token])
    current_session ? current_session.user : nil
  end

  def login!(user)
    session[:session_token] = user.reset_session!
  end

  def logout!
    current_user.destroy_session!(session[:session_token])
    session[:session_token] = nil
  end

  def logged_in?
    !!current_user
  end

  def authorized_user?(id=nil)

    # TODO:  this is adding another db query

    unless logged_in?
      render json: ['Requires user to be logged in.'], status: 401
      return false
    end

    return true if admin_user?

    if current_user.id != id && id != nil
      render json: ['You are logged in as the wrong user.'], status: 401
      return false
    end

    true

  end

  def get_rankings(ladder)
    results = {}
    points = Team.where(active: true, ladder_name: ladder).pluck(:points).sort.reverse
    points.each_with_index { |point, i| results[point] = i+1 unless results[point] }
    results
  end

  def admin_user?
    unless logged_in? && ADMINS.include?(current_user.email)
      render json: ['What are you trying to pull?'], status: 401
      return false
    end
    true
  end

end
