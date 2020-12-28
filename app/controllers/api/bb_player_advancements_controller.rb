
class Api::BbPlayerAdvancementsController < ApplicationController

  def create
    @player = BbPlayer.find_by(id: params[:id])

    # add to bb_player_skills OR update player.ma_improvement (etc)
    # IIF it's mighty blow or dirty player, make sure to add a +1 to the modifier field
    # update player value
    # update player spp
    # update team value

    render 'api/bb_players/show.json.jbuilder', status: 200
  end

  def index
    @player = BbPlayer.find_by(id: params[:id])
    current_rank = @player.advancements.count
    @advancements = BbAdvancements.where(rank: current_rank + 1)

    render 'api/bb_player_advancements/index.json.jbuilder', status: 200
  end

  private

  def player_params
    params.require(:advancement).permit(
      :bb_player_id,
      :bb_advancement_id,
      :bb_skill_id,
    )
  end

end
