json.partial! 'api/users/user_basic.json.jbuilder', user: user
json.partial! 'api/users/user_permissions.json.jbuilder', user: user

json.session user.id
