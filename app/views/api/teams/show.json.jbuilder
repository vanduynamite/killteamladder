json.partial! 'api/teams/team_details.json.jbuilder', team: @team, matchups: @matchups

@matchups.each do |matchup|
  json.partial! 'api/matchups/matchup_basic.json.jbuilder', matchup: matchup
end
