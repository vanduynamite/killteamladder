
export const newNotes = (notes) => {

  // {
  //   notes: {
  //     item_id_list: [1, 2, 3],
  //     note: 'string',
  //   }
  // }

  notes.item_id_list = notes.itemIdList;

  return $.ajax({
    method: 'POST',
    url: '/api/item_notes',
    data: { notes },
  });
};
