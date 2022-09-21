
export const newInvoice = (invoice) => {

  // {
  //   carcosa_id: 'CO#12345',
  //   square_id: 'abc123',
  //   item_id_list: [1, 2, 3],
  // }

  if (invoice.carcosaId !== '') invoice.carcosa_id = invoice.carcosaId;
  if (invoice.squareId !== '') invoice.square_id = invoice.squareId;
  invoice.item_id_list = invoice.itemIdList;

  return $.ajax({
    method: 'POST',
    url: '/api/invoices',
    data: { invoice },
  });
};

export const getNextCarcosaId = () => {
  
  // Because back-end has params.require, I have to send it something
  // IDK, I tried to fix it another way but I'll hack it like this
  const hackAttackInvoice = { square_id: '' };

  return $.ajax({
    method: 'GET',
    url: '/api/get_next_carcosa_id',
    data: { invoice: hackAttackInvoice },
  });
};
