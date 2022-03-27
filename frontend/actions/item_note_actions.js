import * as ItemNoteAPI from '../util/item_note_api_util';

export const RECEIVE_ITEM_NOTES = 'RECEIVE_ITEM_NOTES';

const receiveItemNotes = (data) => {
  return {
    type: RECEIVE_ITEM_NOTES,
    itemNotes: data.itemNotes,
    orderItems: data.orderItems,
  };
};

export const newItemNotes = (notes, historyPush, ladder) => (dispatch) => {
  return ItemNoteAPI.newNotes(notes).then(
    payload => {
      dispatch(receiveItemNotes(payload));
      if (historyPush) historyPush(ladder);
    }
  );
};
