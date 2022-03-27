
export const newItems = (items) => {

  // {
  //   name_list: ['name1', 'name2'],
  //   quantity_list: [1, 1],
  //   note_list: ['note1', null],
  //   purchased_in_store: false,
  // }

  items.name_list = [];
  items.quantity_list = [];
  items.note_list = [];

  for (let i = 0; i < items.numberOfItems; i++) {
    items.name_list.push(items[`name${i}`]);
    items.quantity_list.push(items[`qty${i}`]);
    items.note_list.push(items[`note${i}`] || '');
  }

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
  if (items.distributorId !== 'x') items.distributor_id = items.distributorId;
  if (items.statusId !== 'x') items.status_id = items.statusId;
  items.purchased_in_store = items.purchasedInStore;
  items.item_code = items.itemCode;
  if (items.quantity) items.quantity = items.quantity * 1;

  return $.ajax({
    method: 'PATCH',
    url: '/api/order_items',
    data: { items },
  });
};

export const getOrdermasterItems = (subset) => {

  // acceptable subset values:
  // 'open_items'
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
