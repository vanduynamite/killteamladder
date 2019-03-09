json.teams do
  json.set! team.id do
    json.id team.id
    json.rank @rankings[team.points]
    json.faction team.faction
    json.teamName team.team_name
    json.userId team.user_id
    json.points team.points
    json.active team.active
    json.ladder team.ladder_name
  end
end
