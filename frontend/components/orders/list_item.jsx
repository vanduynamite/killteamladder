import React from 'react';
import { Link } from 'react-router-dom';
import ImageButton from '../general/image_button';
import EmptyDiv from '../general/empty_div';

const listItem = (data) => {
  const item = data.item;
  const currentUser = data.currentUser;
  const owner = data.users[item.userId];

  const selectedClass = data.checked ? 'dark-theme' : '';
  const dateCreatedString = new Date(item.dateCreated).toDateString();
  const userInfo = currentUser.ordermaster ?
    <div><b>{`${owner.firstName} ${owner.lastName}`}</b></div> :
    <EmptyDiv/>;

  const distributor = item.inStorePurchase ?
    <div>{'Purchased in store'}</div> :
    <div>{data.distributor.name}</div>;

  const carcosaNum = item.invoiceId ?
    <div>{`${data.invoice.carcosaId}, item ${item.invoiceItemNum}`}</div> :
    <EmptyDiv/>;

  const notes = item.noteIds.map((noteId) => {
    const note = data.notes[noteId];
    if (!note) return;
    const user = data.users[note.userId];
    return [note.note, new Date(note.created), note.id, user.firstName || ''];
  }).sort((a, b) => {
    return a[1] - b[1];
  }).map((noteInfo) => {
    const dateString = noteInfo[1].toDateString();
    return (
      <div key={noteInfo[2]}>
        <i>{`${noteInfo[3]} on ${dateString}:`}</i> {`${noteInfo[0]}`}
      </div>
    );
  });

  const checkSection = data.action ?
    <div className={`team-rank ${selectedClass}`}>{data.checked ? 'X' : ''}</div> :
    <EmptyDiv/>;

  // TODO: use a different class to fill the width of the item if there is no
  // click action.

  return (
    <div
      className={`team-list-item ${selectedClass}`}
      onClick={data.action}>
      <div className={`team-names ${selectedClass}`}>
        <div>
          <h2>{item.name}</h2>
          <div className={'team-faction-and-owner'}>
            <div>{`Quantity: ${item.quantity}`}</div>
            <div>{`${dateCreatedString}`}</div>
          </div>
        </div>
        <div className={'match-results-container'}>
          <div className={'match-results'}>
            {userInfo}
            {carcosaNum}
            {distributor}
            {notes}
          </div>
        </div>
      </div>
      {checkSection}
    </div>
  );
};

export default listItem;
