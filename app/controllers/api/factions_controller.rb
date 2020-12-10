
class Api::FactionsController < ApplicationController

  def index
    @factions = Faction.where(ladder_name: params[:ladder])
    
    render 'api/factions/index.json.jbuilder'
  end

  private

  def faction_params
    params.require(:faction).permit(
      :faction_name,
      :ladder_name,
    )
  end

end
