
export const signup = user => {

  user.first_name = user.firstName;
  user.last_name = user.lastName;

  return $.ajax({
    method: 'POST',
    url: '/api/users',
    data: { user },
  });
};

export const login = user => {
  user.email = user.email.toLowerCase();
  return $.ajax({
    method: 'POST',
    url: '/api/session',
    data: { user },
  });
};

export const logout = () => {
  return $.ajax({
    method: 'DELETE',
    url: '/api/session',
  });
};
