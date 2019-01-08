
class Api::MatchupsController < ApplicationController


  def create
    @team1 = Team.find_by(id: matchup_params.team_id)
    return false unless authorized_user?(@team1.user_id)

    @team2 = Team.find_by(id: matchup_params.opponent_team_id)

    # TODO: check in here for no recent repeats
    # and that teams have different owners

    matchup1 = @team1.matchups.new(
      result: matchup_params.result,
    )

    matchup2 = @team2.matchups.new(
      result: matchup_params.result * -1,
      opposite: matchup1,
    )

    matchup1.opposite = matchup2

    matchup1.calculate_end_points!
    matchup2.calculate_end_points!

    @team1.points = matchup1.end_points
    @team2.points = matchup2.end_points

    if matchup1.save && matchup2.save && @team1.save && @team2.save
      render json: ['Awesome!'], status: 200
    else
      render json: ['There was an error calculating points'], status: 422
    end

  end

  def update

  end

  def delete

  end

  private

  def matchup_params
    params.require(:matchup).permit(
      :team_id,
      :opponent_team_id,
      :result, # -1, 0, 1
    )
  end

end
