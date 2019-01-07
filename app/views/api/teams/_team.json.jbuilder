json.teams do
  json.set! team.id do
    json.id team.id
    json.faction team.faction
    json.teamName team.team_name
    json.user user.id
  end
end

json.users do
  json.set! user.id do
    json.id user.id
    json.firstName user.first_name
    json.lastName user.last_name
  end
end
