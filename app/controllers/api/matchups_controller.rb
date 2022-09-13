
class Api::MatchupsController < ApplicationController

  def show
    get_matchup_info
  end

  def create
    @team1 = Team.find_by(id: matchup_params[:team_id])
    return false unless my_team_valid?
    return false unless authorized_user?(@team1.user_id)

    @team2 = Team.find_by(id: matchup_params[:opponent_team_id])
    return false unless opponent_team_valid?

    return false unless on_same_ladder?
    return false unless not_matched_against_self?
    return false unless not_matched_last?(@team1, @team2)
    return false unless not_matched_last?(@team2, @team1)
    return false unless valid_results?
    return false unless signed_up_for_league?

    @matchup1 = @team1.matchups.new(
      result: matchup_params[:result].to_i,
    )

    @matchup2 = @team2.matchups.new(
      result: matchup_params[:result].to_i * -1,
      opposite_matchup: @matchup1,
    )

    @matchup1.opposite_matchup = @matchup2

    calculate_matchup

  end

  def update
    get_matchup_info

    return false unless authorized_user?(@team1.user_id)
    return false unless my_team_valid?
    return false unless opponent_team_valid?

    unless @team1.matchups.last == @matchup1 && @team2.matchups.last == @matchup2
      render json: ['You can only edit the match if it is the last match for both teams'], status: 422
      return
    end

    return false unless valid_results?

    @matchup1.result = matchup_params[:result].to_i
    @matchup2.result = matchup_params[:result].to_i * -1

    calculate_matchup

  end

  def destroy
    get_matchup_info
    return false unless authorized_user?(@team1.user_id)
    return false unless my_team_valid?
    return false unless opponent_team_valid?
    return false unless in_current_season?

    unless @team1.matchups.last == @matchup1 && @team2.matchups.last == @matchup2
      render json: ['You can only delete the match if it is the last match for both teams'], status: 422
      return
    end

    @team1.points = @matchup1.start_points
    @team2.points = @matchup2.start_points

    if @team1.save && @team2.save
      @matchup1.destroy
      render json: {
        teamIds: [@team1.id, @team2.id, @team1.ladder_name],
        matchIds: [@matchup1.id, @matchup2.id],
      }, status: 200
    else
      render json: ['There was an error calculating points'], status: 422
    end
  end

  private

  def calculate_matchup
    @matchup1.calculate_end_points!
    @matchup2.calculate_end_points!

    @team1.points = @matchup1.end_points
    @team2.points = @matchup2.end_points

    if @matchup1.save && @matchup2.save && @team1.save && @team2.save
      render json: [@team1.id, @team1.ladder_name], status: 200
    else
      render json: ['There was an error calculating points'], status: 422
    end
  end

  def matchup_params
    params.require(:matchup).permit(
      :team_id,
      :opponent_team_id,
      :result, # -1, 0, 1
    )
  end

  def get_matchup_info
    @matchup1 = Matchup.find_by(id: params[:id])
    @matchup2 = @matchup1.opposite_matchup
    @team1 = @matchup1.team
    @team2 = @matchup2.team

    if @team2.user_id == current_user.id
      @matchup1, @matchup2 = @matchup2, @matchup1
      @team1, @team2 = @team2, @team1
    end
  end

  def my_team_valid?
    unless @team1 && @team1.valid?
      render json: @team1.errors.full_messages, status: 422
      return false
    end

    unless @team1.active
      render json: ["Your team is retired"], status: 422
      return false
    end

    true
  end

  def opponent_team_valid?

    unless @team2 && @team2.valid?
      render json: @team2.errors.full_messages, status: 422
      return false
    end

    unless @team2.active
      render json: ["Opponent's team is retired"], status: 422
      return false
    end

    true
  end

  def not_matched_against_self?
    if @team1.user_id == @team2.user_id
      render json: ['You cannot match up against one of your own teams'], status: 422
      return false
    end
    true
  end

  def valid_results?
    unless ["-1", "0", "1"].include?(matchup_params[:result])
      render json: ['Matchup results are invalid'], status: 422
      return false
    end
    true
  end

  def not_matched_last?(team1, team2)

    # allow any matchup if this is team1's first matchup
    return true unless team1.matchups.last

    # in case the last matchup for this team was last season
    ladder_name = team1.ladder_name
    current_season_num = Season.where(ladder_name: ladder_name).last.season
    return true if current_season_num != team1.matchups.last.season

    if team1.matchups.last.opposite_matchup.team_id == team2.id
      render json: ['You cannot log two matches in a row against the same opposing team'], status: 422
      return false
    end
    true
  end

  def in_current_season?
    ladder_name = @matchup1.ladder.name
    current_season_num = Season.where(ladder_name: ladder_name).last.season
    unless @matchup1.season == current_season_num
      render json: ['You cannot delete a match from a previous season'], status: 422
      return false
    end
    true
  end

  def on_same_ladder?
    unless @team1.ladder == @team2.ladder
      render json: ['Teams must be on the same ladder, come on now'], status: 422
      return false
    end
    true
  end

  def signed_up_for_league?
    user = User.find(@team1.user_id)
    if @team1.ladder_name == '/40k' && !user.permissions.ladder_40k
      render json: ['You are not signed up for the 40K league. Please contact an admin.'], status: 422
      return false
    end
    true
  end


end
