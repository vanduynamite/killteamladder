
class Api::BbPlayerAdvancementsController < ApplicationController

  def create
    @player = BbPlayer.find(advancement_params[:bb_player_id])
    @team = @player.team
    return false unless authorized_user?(@team.user_id)
    @advancement = BbAdvancement.find(advancement_params[:bb_advancement_id])

    if @player.advancements.count + 1 != @advancement.rank
      render json: ['This is the wrong rank advancement for this player. Please refresh the page and try again.'], status: 422
      return
    end

    if @advancement.requires_skill_id && !advancement_params[:bb_skill_id]
      render json: ['You need to include a skill. Please refresh the page and try again.'], status: 422
      return
    end

    if @advancement.stat_upgrade && advancement_params[:bb_skill_id]
      render json: ['Something went wrong and a skill was included, refresh the page and try again.'], status: 422
      return
    end

    # checks complete, everything else should be taken care of in validations
    @bb_team = @player.team.bb_team
    @player_advancement = BbPlayerAdvancement.new(
      bb_advancement_id: @advancement.id,
      bb_player_id: @player.id,
    )

    if @advancement.requires_skill_id
      @player_advancement.bb_skill_id = advancement_params[:bb_skill_id]
      @skill = BbSkill.find(advancement_params[:bb_skill_id])
      @player_skill = BbPlayerSkill.new(
        bb_skill_id: @skill.id,
        bb_player_id: @player.id
      )

      if @skill.name == 'Mighty Blow' || @skill.name == 'Dirty Player'
        @player_skill.modifier = '+1'
      end
    else
      increase_player_stat
    end

    @player.current_value += @advancement.value_increase
    @player.spp -= @advancement.spp_cost

    if @player.valid? && @player_advancement.valid? && (@player_skill == nil || @player_skill.valid?)
      @player_skill.save if @player_skill
      @player_advancement.save
      @player.save
      @bb_team.update_team_value!
      render 'api/bb_player_advancements/create.json.jbuilder', status: 200
    else
      errors = @player_advancement.errors.full_messages.concat(@player.errors.full_messages)
      if @player_skill
        errors.concat(@player_skill.errors.full_messages)
      end
      render json: errors, status: 422
    end
  end

  def increase_player_stat
      @player.ma_improvement += 1 if @advancement.name.index('Movement')
      @player.av_improvement += 1 if @advancement.name.index('Armour')
      @player.pa_improvement += 1 if @advancement.name.index('Passing')
      @player.ag_improvement += 1 if @advancement.name.index('Agility')
      @player.st_improvement += 1 if @advancement.name.index('Strength')
  end

  def index
    @player = BbPlayer.includes(:primary_skill_groups, :secondary_skill_groups,
                                :primary_skills, :secondary_skills)
                      .find(params[:bb_player_id])
    @team = @player.team
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
