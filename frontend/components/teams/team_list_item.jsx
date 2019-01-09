import React from 'react';
import { Link } from 'react-router-dom';

export default function({ team, owner, currentUserId }) {
  const owned = team.userId === currentUserId ? ' owned' : '';
  const ownerName = `${owner.firstName} ${owner.lastName}`;

  return (
    <Link to={ `/team/${ team.id }` }>
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
    </Link>
  );
}
