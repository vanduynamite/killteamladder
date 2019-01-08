import React from 'react';

export default function({ team, owner, currentUserId }) {
  const owned = team.user === currentUserId ? ' owned' : '';
  const ownerName = `${owner.firstName} ${owner.lastName}`;

  return (
    <div className={ `team-list-item ${owned}` }>
      <div className={ `team-names ${owned}` }>
        <h2>{ team.teamName }</h2>
        <div className={ 'team-faction-and-owner' }>
          <div>{ team.faction }</div>
          <div className={ 'owner' }>{ ownerName }</div>
        </div>
      </div>
      <div className={ `team-rank ${owned}` }>
        { team.id }
      </div>
    </div>
  );
}
