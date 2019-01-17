json.users do
  json.set! user.id do
    json.id user.id
    json.firstName user.first_name
    json.lastName user.last_name
    json.email user.email

    json.teamIds teams.sort_by { |t| t[:points] }.reverse.map { |t| t.id }
    json.retiredTeamIds retired_teams.sort_by { |t| t[:points] }.reverse.map { |t| t.id }

    # n+1 going on here
    json.matchesPlayed user.plays
    json.matchesWon user.wins
    json.matchesLost user.losses
    json.matchesTied user.ties
  end
end
