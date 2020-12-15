
class CanTeamAffordNewPlayer < ActiveModel::Validator

  def validate(record)
    available_treasury = BbTeam.where(team_id: record.team_id).first.treasury
    hiring_fee = BbPlayerTemplate.find(record.bb_player_template_id).cost

    if (hiring_fee >= available_treasury)
      record.errors.add :base, "You don't have enough money!"
      return
    end

  end

end
