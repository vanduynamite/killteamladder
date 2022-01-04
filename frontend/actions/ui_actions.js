export const SET_PATH_HISTORY = 'SET_PATH_HISTORY';
export const CLEAR_PATH_HISTORY = 'CLEAR_PATH_HISTORY';
export const TOGGLE_CHECKED_ITEM = 'TOGGLE_CHECKED_ITEM';
export const CLEAR_CHECKED_ITEMS = 'CLEAR_CHECKED_ITEMS';

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

export const toggleCheckedItem = (itemId) => {
  return {
    type: TOGGLE_CHECKED_ITEM,
    data: itemId,
  };
};

export const clearCheckedItems = () => {
  return {
    type: CLEAR_CHECKED_ITEMS,
  };
};
