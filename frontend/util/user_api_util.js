
export const getUser = (id, ladder) => {
  return $.ajax({
    method: 'GET',
    url: `/api/users/${id}`,
    data: { ladder },
  });
};

export const editUser = user => {

  user.first_name = user.firstName;
  user.last_name = user.lastName;
  user.receive_daily_email = user.receiveDailyEmail;
  if (user.password === '') delete user.password;

  return $.ajax({
    method: 'PATCH',
    url: `/api/users/${user.id}`,
    data: { user },
  });
};
