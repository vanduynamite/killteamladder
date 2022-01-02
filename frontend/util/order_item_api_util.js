
export const newItems = (items) => {

  // {
  //   name_list: ['name1', 'name2'],
  //   quantity_list: [1, 1],
  //   note_list: ['note1', null],
  //   purchased_in_store: false,
  // }

  // TODO: probably will be receiving a list of objects
  // need to convert to an object of lists

  items.name_list = items.nameList;
  items.quantity_list = items.quantityList;
  items.note_list = items.noteList;
  items.purchased_in_store = items.purchasedInStore;

  return $.ajax({
    method: 'POST',
    url: '/api/order_items',
    data: { items },
  });
};

export const getItems = () => {
  return $.ajax({
    method: 'GET',
    url: '/api/order_items',
  });
};

export const editItems = (items) => {

  // {
  //   item_id_list: [1, 2, 3],
  //   name: 'new name',
  //   quantity: 1,
  //   distributor_id: 2,
  //   status_id: 34,
  //   purchased_in_store: false,
  //   item_code: 'AHC054',
  // }

  items.item_id_list = items.itemIdList;
  items.distributor_id = items.distributorId;
  items.status_id = items.statusId;
  items.purchased_in_store = items.purchasedInStore;
  items.item_code = items.itemCode;

  return $.ajax({
    method: 'PATCH',
    url: '/api/order_items',
    data: { items },
  });
};

export const getOrdermasterItems = (subset) => {

  // acceptable subset values:
  // 'new_items'
  // 'invoiced_items'
  // 'ordered_items'
  // 'shipped_items'
  // 'completed_items'
  // 'items_with_issue'

  return $.ajax({
    method: 'GET',
    url: `/api/${subset}`
  });
};
