
class Api::FactionsController < ApplicationController

  def update

  end

  private

  def bb_team_params
    params.require(:bb_team).permit(
      :apothecaries,
      :assistant_coaches,
      :cheerleaders,
      :rerolls,
      :dedicated_fans,
    )
  end

end
