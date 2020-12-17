json.teams do
  json.set! team.id do
    json.id team.id
    json.rank @rankings[team.points]
    json.factionId team.faction_id
    json.teamName team.team_name
    json.userId team.user_id
    json.points team.points
    json.active team.active
    json.ladder team.ladder_name
    json.matchIds team.matchups.map { |m| m.id }.sort.reverse

    json.stats team.stats
    
    if @players
      json.playerIds team.players.order('number asc').map { |p| p.id }
    end

    if @bb_team
      json.bbStats do
        json.apothecaries @bb_team.apothecaries
        json.assistantCoaches @bb_team.assistant_coaches
        json.cheerleaders @bb_team.cheerleaders
        json.currentTeamValue @bb_team.current_team_value
        json.dedicatedFans @bb_team.dedicated_fans
        json.rerolls @bb_team.rerolls
        json.teamValue @bb_team.team_value
        json.treasury @bb_team.treasury
      end
    end
  end
end
