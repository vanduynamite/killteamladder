
class PositionLimitValidator < ActiveModel::Validator

  def validate(record)
    player_template = BbPlayerTemplate.find(record.bb_player_template_id)

    num_positions_on_team = BbPlayer.where(
      team_id: record.team_id, bb_player_template_id: player_template.id).count

    num_positions_allowed = player_template.max_allowed
    # or some group shit

    if (num_positions_on_team >= num_positions_allowed)
      record.errors.add :base, "Too many of this position on the team!"
    end

  end

end
