import React from 'react';
import { Link } from 'react-router-dom';

export default function({ team, owner, currentUserId, active=true, ladder, faction }) {
  if (!faction) return <></>; // don't know why this is happening still
  let klass = team.userId === currentUserId ? ' owned' : '';
  const ownerName = currentUserId ?
    `${owner.firstName} ${owner.lastName}` :
    '';
  let rankSection = <div className={ `team-rank ${klass}` }>{ team.rank }</div>;

  if (!active) {
    klass = ' retired';
    rankSection = '';
  }

  return (
    <Link to={ `${ladder}/team/${ team.id }` }>
      <div className={ `team-list-item ${klass}` }>
        <div className={ `team-names ${klass}` }>
          <h2>{ team.teamName }</h2>
          <div className={ 'team-faction-and-owner' }>
            <div>{ faction.faction_name }</div>
            <div className={ 'owner' }>{ ownerName }</div>
          </div>
        </div>
        { rankSection }
      </div>
    </Link>
  );
}
