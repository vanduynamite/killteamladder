json.users do
  json.set! user.id do
    json.id user.id
    json.firstName user.first_name
    json.lastName user.last_name
  end
end
