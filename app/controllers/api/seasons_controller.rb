
class Api::SeasonsController < ApplicationController

  def create
    return false unless admin_user?

    ladder_name = season_params[:ladder]
    ladder = Ladder.find_by(name: ladder_name)
    if !ladder
      render json: ['Invalid ladder name'], status: 400
      return
    end

    next_season_num = Season.where(ladder_name: ladder_name).last.season + 1
    @season = Season.new(season: next_season_num, ladder_name: ladder_name)

    if @season.save
      render json: ['Season reset successfully'], status: 200
    else
      render json: @season.errors.full_messages, status: 400
    end
  end

  private

  def season_params
    params.require(:season).permit(
      :ladder,
    )
  end

end
