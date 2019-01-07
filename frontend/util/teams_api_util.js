
export const newTeam = team => {

  // return {
  //   teams: {
  //     1: {
  //       id: 1,
  //       faction: 'Adeptus Mechanicus',
  //       teamName: 'Vigilus Strike Force IVV',
  //       ownerId: 1,
  //     }
  //   },
  //   users: {
  //     1: {
  //       id: 1,
  //       firstName: "Paul",
  //       lastName: "van Duyn"
  //     },
  //   },
  // };

  return $.ajax({
    method: 'POST',
    url: '/api/team/new',
    data: { team },
  });
};

export const getTeams = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/teams',
  });
};
