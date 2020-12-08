json.partial! 'api/teams/team_basic.json.jbuilder', team: @team
json.partial! 'api/users/user_basic.json.jbuilder', user: @user
# not sending faction name here because it sure should have it after creation
