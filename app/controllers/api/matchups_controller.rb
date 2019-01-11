
class Api::MatchupsController < ApplicationController

  def show
    getMatchupInfo
  end

  def create
    @team1 = Team.find_by(id: matchup_params[:team_id])
    return false unless my_team_valid?
    return false unless authorized_user?(@team1.user_id)

    @team2 = Team.find_by(id: matchup_params[:opponent_team_id])
    return false unless opponent_team_valid?

    return false unless not_matched_against_self?
    return false unless not_matched_last?(@team1, @team2)
    return false unless not_matched_last?(@team2, @team1)
    return false unless valid_results?


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
    getMatchupInfo

    if @team2.user_id == current_user.id
      @matchup1, @matchup2 = @matchup2, @matchup1
      @team1, @team2 = @team2, @team1
    end

    return false unless authorized_user?(@team1.user_id)

    unless @team1.matchups.last == @matchup1 && @team2.matchups.last == @matchup2
      render json: ['You can only edit the match if it is the last match for both teams'], status: 422
      return
    end

    return false unless valid_results?

    @matchup1.result = matchup_params[:result].to_i
    @matchup2.result = matchup_params[:result].to_i * -1

    calculate_matchup

  end

  def calculate_matchup
    @matchup1.calculate_end_points!
    @matchup2.calculate_end_points!

    @team1.points = @matchup1.end_points
    @team2.points = @matchup2.end_points

    if @matchup1.save && @matchup2.save && @team1.save && @team2.save
      render json: [@team1.id], status: 200
    else
      render json: ['There was an error calculating points'], status: 422
    end
  end

  private

  def matchup_params
    params.require(:matchup).permit(
      :team_id,
      :opponent_team_id,
      :result, # -1, 0, 1
    )
  end

  def getMatchupInfo
    @matchup1 = Matchup.find_by(id: params[:id])
    @matchup2 = @matchup1.opposite_matchup
    @team1 = @matchup1.team
    @team2 = @matchup2.team
  end

  def my_team_valid?
    unless @team1 && @team1.valid?
      render json: ['Your team is not included in the list'], status: 422
      return false
    end
    true
  end

  def opponent_team_valid?
    unless @team2 && @team2.valid?
      render json: ['Opponent\'s team is not included in the list'], status: 422
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
    if team1.matchups.last && team1.matchups.last.opposite_matchup.team_id == team2.id
      render json: ['You cannot log two matches in a row against the same opposing team'], status: 422
      return false
    end
    true
  end


end
