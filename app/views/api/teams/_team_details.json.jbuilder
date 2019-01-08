json.teams do
  json.set! team.id do
    json.id team.id
    json.faction team.faction
    json.teamName team.team_name
    json.user team.user_id
    json.matchupIds matches.map { |m| m.id }

    json.matchesPlayed team.plays
    json.matchesWon team.wins
    json.matchesLost team.losses
    json.matchesTied team.ties
  end
end
