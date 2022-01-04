import React from 'react';
import { Link } from 'react-router-dom';
import ImageButton from '../general/image_button';

export default function({ match, team, opposingTeam, opponent,
  currentUser, ownerViewing, editable=false, ladder, factions }) {

  const dateString = new Date(match.date).toDateString();

  const opponentViewing = currentUser ?
    opposingTeam.userId === currentUser.id :
    false;

  const owned = opponentViewing ? 'dark-theme' : '';
  const opponentName = currentUser ?
    `${opponent.firstName} ${opponent.lastName}` :
    '';

  const opposingFaction = factions[opposingTeam.factionId];
  if (!opposingFaction) return <></>; // don't know why this is happening still

  let editButton = <></>;
  if (editable && (opponentViewing || ownerViewing)) {
    editButton = <ImageButton path={ `${ladder}/match/${match.id}/edit` } image={ window.edit } />;
  }

  return (
    <div className={ `team-list-item ${owned}` }>
      <div className='date'>{ dateString }</div>

      <div className={ `match-names ${owned}` }>
        <Link to={ `${ladder}/team/${ opposingTeam.id }` }>
          <h2>{ opposingTeam.teamName }</h2>
          <div className={ 'team-faction-and-owner' }>
            <div>{ opposingFaction.faction_name }</div>
            <div className={ 'owner' }>{ opponentName }</div>
          </div>
        </Link>
        <div className='match-results-container'>
          <div className='match-results'>
            <div>{ results(match.result) }</div>
            <div>{ pointChange(match.endPoints - match.startPoints, team) }</div>
            <div>{ pointChange(match.oppEndPoints - match.oppStartPoints, opposingTeam) }</div>
          </div>
          { editButton }
        </div>
      </div>
    </div>
  );
}

const results = (result) => {
  switch (result) {
    case 1:
      return 'Victory!';

    case -1:
      return 'Defeat...';

    case 0:
      return 'Evenly matched'

    default:
      return 'Error :('
  };
}

const pointChange = (pointDiff, team) => {
  if (pointDiff >= 0) {
    return `${team.teamName} gained ${pointDiff} points`;
  } else if (pointDiff < 0) {
    return `${team.teamName} lost ${Math.abs(pointDiff)} points`;
  }
}
