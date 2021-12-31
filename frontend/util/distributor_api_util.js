
export const getDistributors = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/distributors',
  });
};
