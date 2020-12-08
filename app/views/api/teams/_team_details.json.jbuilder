json.teams do
  json.set! team.id do
    json.id team.id
    json.rank @rankings[team.points]
    json.faction team.faction
    json.factionId team.faction_id
    json.teamName team.team_name
    json.userId team.user_id
    json.points team.points
    json.active team.active
    json.ladder team.ladder_name
    json.matchIds team.matchups.map { |m| m.id }.sort.reverse

    json.stats team.stats
  end
end
