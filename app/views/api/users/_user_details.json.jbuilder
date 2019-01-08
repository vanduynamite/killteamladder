json.users do
  json.set! user.id do
    json.id user.id
    json.firstName user.first_name
    json.lastName user.last_name
    # json.email user.email # commented out for privacy for now

    # n+1 going on here
    json.matchesPlayed matches.count
    json.matchesWon matches.where(result: 1).count
    json.matchesLost matches.where(result: -1).count
    json.matchesTied matches.where(result: 0).count
  end
end
