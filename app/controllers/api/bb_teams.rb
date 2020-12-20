
class Api::FactionsController < ApplicationController

  def show
    @team = Team.find_by(id: params[:id])
    debugger

    # returns all players and player templates on that team
    # also return availability of those templates on the team record
    # players:
    # templates:
    # teams:
    render json: ['success yo yo']
  end

end
