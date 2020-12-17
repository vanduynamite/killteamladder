import React from 'react';
import Statistic from '../general/statistic';

export default function({ team }) {
  const stats = team.bbStats;
  return (
    <div className='info-container' id='bb-stats'>
      <Statistic name='Team value' grey={ false } bold={ true }
        stat={ stats.teamValue } />
      <Statistic name='Current team value' grey={ true }
        stat={ stats.currentTeamValue }/>
      <Statistic name='Treasury' grey={ false }
        stat={ stats.treasury } />
      <Statistic name='Rerolls' grey={ true }
        stat={ stats.rerolls }/>
      <Statistic name='Dedicated fans' grey={ false }
        stat={ stats.dedicatedFans } />
      <Statistic name='Assistant coaches' grey={ true }
        stat={ stats.assistantCoaches }/>
      <Statistic name='Cheerleaders' grey={ false }
        stat={ stats.cheerleaders } />
      <Statistic name='Apothecaries' grey={ true }
        stat={ stats.apothecaries }/>
    </div>
  );
}
