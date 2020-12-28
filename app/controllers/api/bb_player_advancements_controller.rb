
class Api::BbPlayerAdvancementsController < ApplicationController

  def create
    @player = BbPlayer.find(advancement_params[:bb_player_id])

    # check to make sure the correct rank is being added

    # add to bb_player_skills OR update player.ma_improvement (etc)
    # IIF it's mighty blow or dirty player, make sure to add a +1 to the modifier field
    # update player value
    # update player spp
    # update team value

    render 'api/bb_player_advancements/create.json.jbuilder', status: 200
  end

  def index
    @player = BbPlayer.includes(:primary_skill_groups, :secondary_skill_groups, :primary_skills, :secondary_skills)
                      .find(params[:bb_player_id])
    current_rank = @player.advancements.count
    @advancements = BbAdvancement.where(rank: current_rank + 1)

    render 'api/bb_player_advancements/index.json.jbuilder', status: 200
  end

  private

  def advancement_params
    params.require(:advancement).permit(
      :bb_player_id,
      :bb_advancement_id,
      :bb_skill_id,
    )
  end

end
