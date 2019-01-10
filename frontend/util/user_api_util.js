
export const getUser = id => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`,
  });
};

export const editUser = user => {

  user.first_name = user.firstName;
  user.last_name = user.lastName;

  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user },
  });
};
