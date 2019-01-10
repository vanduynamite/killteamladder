
export const newTeam = team => {

  team.team_name = team.teamName;

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

export const getTeams = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/teams',
  });
};
