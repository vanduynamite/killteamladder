json.teams do
  json.set! team.id do
    json.id team.id
    json.rank team.rank
    json.faction team.faction
    json.teamName team.team_name
    json.userId team.user_id
    json.points team.points
  end
end
