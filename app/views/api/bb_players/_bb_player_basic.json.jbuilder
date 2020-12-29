json.players do
  json.set! player.id do
    json.id player.id
    json.teamId player.team_id
    json.number player.number
    json.name player.name
    json.positionName player.position_name
    json.currentValue player.current_value
    json.ma player.ma
    json.st player.st
    json.ag player.ag
    json.pa player.pa
    json.av player.av
    json.mng player.mng
    json.ni player.ni
    json.spp player.spp
    json.temporarilyRetired player.temporarily_retired
    json.skills player.skill_string
    json.psg player.primary_skill_group_string
    json.ssg player.secondary_skill_group_string
    json.userId @team.user_id
  end
end
