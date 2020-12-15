
class PositionLimitValidator < ActiveModel::Validator

  def validate(record)
    player_template = BbPlayerTemplate.find(record.bb_player_template_id)

    players_on_team = BbPlayer.where(team_id: record.team_id)
    num_positions_on_team = players_on_team.where(
      bb_player_template_id: player_template.id).count

    max_allowed = player_template.max_allowed

    # stop if there are already too many of this specific template
    if (num_positions_on_team >= max_allowed)
      record.errors.add :base, "Too many of this position on the team!"
      return
    end

    position_group = player_template.position_group
    if !position_group
      return
    end

    grouped_player_template_ids = position_group.grouped_player_template_ids

    num_group_positions_on_team = players_on_team.where(
      bb_player_template_id: (grouped_player_template_ids)
    ).count

    group_max_allowed = player_template.group_max_allowed

    if (num_group_positions_on_team >= group_max_allowed)
      record.errors.add :base, "Too many of this position group on the team!"
      return
    end

  end

end
