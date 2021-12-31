
export const newInvoice = (invoice) => {

  // {
  //   invoice: {
  //     carcosa_id: 'CO#12345',
  //     square_id: 'abc123',
  //     item_id_list: [1, 2, 3],
  //   }
  // }

  invoice.carcosa_id = invoice.carcosaId;
  invoice.square_id = invoice.squareId;
  invoice.item_id_list = invoice.itemIdList;

  return $.ajax({
    method: 'POST',
    url: '/api/invoices',
    data: { invoice },
  });
};
