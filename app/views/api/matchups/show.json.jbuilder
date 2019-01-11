json.partial! 'api/matchups/matchup_basic.json.jbuilder', matchup: @matchup1
json.partial! 'api/matchups/matchup_basic.json.jbuilder', matchup: @matchup2

json.teams do
  json.set! @team1.id do
    json.id @team1.id
    json.teamName @team1.team_name
    json.userId @team1.user_id
  end
  json.set! @team2.id do
    json.id @team2.id
    json.teamName @team2.team_name
    json.userId @team2.user_id
  end
end
