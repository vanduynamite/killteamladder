
export const newTeam = team => {

  team.team_name = team.teamName;
  team.ladder_name = team.ladderName;

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
