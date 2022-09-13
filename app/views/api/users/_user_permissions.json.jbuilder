json.users do
  json.set! user.id do
    json.id user.id
    json.ordermaster user.permissions.ladder_40k
    json.member user.permissions.member
    json.canOrder user.permissions.order
    json.unpacker user.permissions.unpacker
    json.ordermaster user.permissions.ordermaster
    json.ladderAdmin user.permissions.ladder_admin
    json.admin user.permissions.admin
    json.fortyKLeague user.permissions.ladder_40k
  end
end
