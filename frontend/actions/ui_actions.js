export const SET_PATH_HISTORY = 'SET_PATH_HISTORY';
export const CLEAR_PATH_HISTORY = 'CLEAR_PATH_HISTORY';

export const setPathHistory = data => {
  return {
    type: SET_PATH_HISTORY,
    data,
  };
};

export const clearPathHistory = () => {
  return {
    type: CLEAR_PATH_HISTORY,
  };
};
