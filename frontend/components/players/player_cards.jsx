import React from 'react';
import Statistic from '../general/statistic';
import PlayerListItem from './player_list_item'

export default function({ players, playerIds, editable=false }) {
  if (!players || !playerIds) return;

  const playerList = playerIds.map((id) => {
    const player = players[id];
    return <PlayerListItem player={ player } key={ id } editable={ editable }/>;
  });

  return (
    <div id='main-list'>
      { playerList }
    </div>
  );
}
