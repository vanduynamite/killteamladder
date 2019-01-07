import React from 'react';

export default function({ team, owner }) {
  const owned = team.user === owner.id ? ' owned' : '';
  const ownerName = `${owner.firstName} ${owner.lastName}`;

  return (
    <div className={ `team-list-item ${owned}` }>
      <div className={ `team-names ${owned}` }>
        <h2>{ team.teamName }</h2>
        <div>
          <div>{ team.faction }</div>
          <div>{ ownerName }</div>
        </div>
      </div>
      <div className={ `team-rank ${owned}` }>
      { team.id }
      </div>
    </div>
  );
}
