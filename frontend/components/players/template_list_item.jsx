import React from 'react';
import { Link } from 'react-router-dom';
import ImageButton from '../general/image_button';

export default function({ template, addable=false }) {
  const positionName = template.positionName;
  const cost = 'Cost: ' + template.cost;
  const statGroups = template.psg + ' / ' + template.ssg;
  const numAllowed = 'Remaining available: ' + template.allowed;
  const skills = template.skills;
  const addPositionButton = addable ? <ImageButton
    path={ `addposition/${template.id}` } image={ window.add } /> :
    <></>;

  return (
    <div className={ 'team-list-item' }>
      <div className={ 'match-names' }>
        <div className={ 'player-title' }>
          <h2>{ positionName }</h2>
          { addPositionButton }
        </div>
        <div className={ 'team-faction-and-owner' }>
          <div>{ numAllowed }</div>
        </div>
        <div className={ 'team-faction-and-owner' }>
          <div>{ cost }</div>
          <div>{ statGroups }</div>
        </div>
        <div className='match-results-container'>
          <div className='match-results'>
            <div>{ statLine(template) }</div>
            <div>{ skills }</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const statLine = (template) => {
 return (
   <div className={ 'bb-stat-line'}>
     <div><b>ma: </b>{ template.ma }</div>
     <div><b>st: </b>{ template.st }</div>
     <div><b>ag: </b>{ template.ag }</div>
     <div><b>pa: </b>{ template.pa }</div>
     <div><b>av: </b>{ template.av }</div>
   </div>
 );
};
