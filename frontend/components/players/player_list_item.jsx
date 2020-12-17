import React from 'react';
import { Link } from 'react-router-dom';
import ImageButton from '../general/image_button';

export default function({ player }) {

  const numberAndName = '#' + player.number + ' ' + player.name;
  const position = player.positionName;
  const spp = player.spp + ' SPP';
  const value = player.currentValue;
  const statGroups = player.psg + ' / ' + player.ssg;
  const stats = 'yes';
  const skills = player.skills;

  return (
    <div className={ `team-list-item` }>
      <div className={ `match-names` }>
        <h2>{ numberAndName }</h2>
        <div className={ 'team-faction-and-owner' }>
          <div>{ position }</div>
          <div>{ value }</div>
        </div>
        <div className={ 'team-faction-and-owner' }>
          <div>{ spp }</div>
          <div>{ statGroups }</div>
        </div>
        <div className='match-results-container'>
          <div className='match-results'>
            <div>{ statLine(player) }</div>
            <div>{ skills }</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const statLine = (player) => {
 return (
   <div className={ 'bb-stat-line'}>
     <div><b>ma: </b>{ player.ma }</div>
     <div><b>st: </b>{ player.st }</div>
     <div><b>ag: </b>{ player.ag }</div>
     <div><b>pa: </b>{ player.pa }</div>
     <div><b>av: </b>{ player.av }</div>
   </div>
 );
};
