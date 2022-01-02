import * as DistributorAPI from '../util/distributor_api_util';

export const RECEIVE_DISTRIBUTORS = 'RECEIVE_DISTRIBUTORS';

const receiveDistributors = (data) => {
  return {
    type: RECEIVE_DISTRIBUTORS,
    distributors: data.distributors,
  };
};

export const getDistributors = () => (dispatch) => {
  return DistributorAPI.getDistributors().then(
    (payload) => dispatch(receiveDistributors(payload))
  );
};
