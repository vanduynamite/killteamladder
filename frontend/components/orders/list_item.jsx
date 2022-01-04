import React from 'react';
import { Link } from 'react-router-dom';
import ImageButton from '../general/image_button';

const listItem = (data) => {
  const includeUserInfo = data.includeUserInfo;
  const currentUser = data.currentUser;
  const item = data.item;

  const selectedClass = data.checked ? 'dark-theme' : '';
  const dateCreatedString = new Date(item.dateCreated).toDateString();



  const distributor = item.inStorePurchase ?
    (<div>{'Purchased in store'}</div>) :
    (<div>{data.distributor.name}</div>);

  const carcosaNum = item.invoiceId ?
    (<div>{`${data.invoice.carcosaId}, item ${item.invoiceItemNum}`}</div>) :
    (<></>);

  const notes = item.noteIds.map((noteId) => {
    const note = data.notes[noteId];
    if (!note) return;
    const user = data.users[note.userId];
    return [note.note, new Date(note.created), note.id, user?.firstName];
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
            {carcosaNum}
            {distributor}
            {notes}
          </div>
        </div>
      </div>
      <div className={`team-rank ${selectedClass}`}>
        {data.checked ? 'X' : ''}
      </div>
    </div>
  );
};

export default listItem;
