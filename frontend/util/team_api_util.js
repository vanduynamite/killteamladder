
export const newTeam = team => {

  team.team_name = team.teamName;
  team.ladder_name = team.ladderName;
  team.faction_id = team.faction;

  return $.ajax({
    method: 'POST',
    url: '/api/teams',
    data: { team },
  });
};

export const getTeam = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/teams/${id}`,
  });
};

export const editTeam = team => {

  team.team_name = team.teamName;
  team.assistant_coaches = team.assistantCoaches * 1;
  team.dedicated_fans = team.dedicatedFans * 1;
  team.cheerleaders = team.cheerleaders * 1;
  team.apothecaries = team.apothecaries * 1;
  team.rerolls = team.rerolls * 1;
  team.treasury = team.treasury * 1;

  return $.ajax({
    method: 'PATCH',
    url: `/api/teams/${team.id}`,
    data: { team },
  });
};

export const getTeams = (ladder) => {
  return $.ajax({
    method: 'GET',
    url: '/api/teams',
    data: { ladder },
  });
};

export const getFactions = (ladder) => {
  return $.ajax({
    method: 'GET',
    url: '/api/factions',
    data: { ladder },
  });
};
