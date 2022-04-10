json.users do
  json.set! user.id do
    json.id user.id
    json.firstName user.first_name
    json.lastName user.last_name
    json.email user.email

    if teams
      json.teamIds teams.sort_by { |t| t[:points] }.reverse.map { |t| t.id }
    end

    if retired_teams
      json.retiredTeamIds retired_teams.sort_by { |t| t[:points] }.reverse.map { |t| t.id }
    end

    if stats
      json.stats stats
    end
  end
end
