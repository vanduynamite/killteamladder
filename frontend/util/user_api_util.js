
export const getUser = (id, ladder='/underworlds') => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`,
    data: { ladder },
  });
};

export const editUser = user => {

  user.first_name = user.firstName;
  user.last_name = user.lastName;
  if (user.password === '') delete user.password;

  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user },
  });
};
