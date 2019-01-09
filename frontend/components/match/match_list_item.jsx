import React from 'react';
import { Link } from 'react-router-dom';

export default function({ match, team, user, currentUser, ownerViewing }) {

  const opponentViewing = currentUser ?
    team.userId === currentUser.id :
    false;

  const owned = opponentViewing ? 'owned' : '';

  const opponentName = `${user.firstName} ${user.lastName}`;

  return (
    <div className={ `team-list-item ${owned}` }>
      <div className={ `match-names ${owned}` }>
        <h2>{ team.teamName }</h2>
        <div className={ 'team-faction-and-owner' }>
          <div>{ team.faction }</div>
          <div className={ 'owner' }>{ opponentName }</div>
        </div>
      </div>
    </div>
  );
}
