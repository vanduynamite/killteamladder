import React from 'react';
import Statistic from '../general/statistic';
import ImageButton from '../general/image_button';
import ButtonLink from '../general/button_link';
import MatchListItem from '../match/match_list_item';
import PlayerCards from '../players/player_cards';
import BBStatTable from '../bb_teams/team_stats';

class Team extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.cameFromNewMatch) {
      this.props.setPathHistory({ team: this.props.currentTeamId });
      setTimeout(this.props.history.push(`${this.props.ladder}/match/new`), 400);
    }
    this.props.getTeam(this.props.currentTeamId);
  }

  componentDidUpdate(oldProps) {
    if (this.props.currentTeamId !== oldProps.currentTeamId) {
      this.props.getTeam(this.props.currentTeamId);
    }
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === `${this.props.ladder}/match/new`) {
      this.props.setPathHistory({ team: this.props.currentTeamId });
    }
  }

  render() {
    let logMatchButton;
    if (this.props.currentTeam && this.props.currentUser && this.props.currentTeam.active) {
      if (this.props.currentTeam.userId === this.props.currentUser.id) {
        logMatchButton = <ButtonLink text='Log a match' path={ `${this.props.ladder}/match/new` } type='submit-active'/>;
      }
    }

    return (
      <div className='frame'>
        <h1>
          Team details
        </h1>
        { this.retiredSection() }
        { this.teamDetails() }
        { this.teamStats() }
        { this.bbTeamHeader() }
        { this.bbTeamDetails() }
        { logMatchButton }
        { this.playersHeader() }
        { this.players() }
        { this.matches() }
      </div>
    );
  }

  // subcomponents

  retiredSection() {
    if (!this.props.currentTeam) return;
    if (this.props.currentTeam.active) return;
    return (
      <div id='retired-section'>
        { 'RETIRED' }
      </div>
    );
  }

  teamDetails() {
    if (!this.props.currentTeam) return;

    const team = this.props.currentTeam;
    const owner = this.props.users[team.userId];
    const fullName = this.props.currentUser ?
      `${owner.firstName} ${owner.lastName}` :
      '';
    const faction = this.props.factions[team.factionId];
    if (!faction) return <></>; // don't know why this is happening still

    let editLink;
    let owned = '';
    let bottomLine = (
      <div className={ 'team-header-faction owned' }>
        <div>{ faction.factionName }</div>
      </div>
    );

    if (this.props.ownerViewing && team.active) {
      editLink = <ImageButton
        path={ `${this.props.ladder}/team/${this.props.currentTeamId}/edit` }
        image={ window.edit_dark } />;
      owned = ' owned';
    } else {
      bottomLine =
      <div className={ 'team-header-faction owned' }>
        <div>{ faction.factionName }</div>
        <div>{ fullName }</div>
      </div>;
    }

    return (
      <div className={ 'info-container' + owned } id='team-details'>
        <div className={ 'team-header' + owned }>
          <div className={ 'team-header-name' + owned }>
            { team.teamName }
          </div>
          { bottomLine }
        </div>
        <div>
          { editLink }
        </div>
      </div>
    );
  }

  teamStats() {
    if (!this.props.currentTeam) return;
    if (!this.props.currentTeam.stats) return;
    const team = this.props.currentTeam;


    let winPercentage = Math.round((team.stats.matchesWon / team.stats.matchesPlayed) * 10000) / 100;
      winPercentage = winPercentage.toString() + '%';
      if (winPercentage === 'NaN%') winPercentage = 'Play a game!';

    let standing = <Statistic name='Current standing'
      stat={ team.rank } bold={ true }/>;
    if (!team.active) standing = '';

    return (
      <div className='info-container' id='account-stats'>
        { standing }
        <Statistic name='Total points' grey={ true } bold={ true }
          stat={ team.points } />
        <Statistic name='Games played (this season)'
          stat={ team.stats.matchesPlayed }/>
        <Statistic name='Wins' grey={ true }
          stat={ team.stats.matchesWon } />
        <Statistic name='Losses'
          stat={ team.stats.matchesLost }/>
        <Statistic name='Ties' grey={ true }
          stat={ team.stats.matchesTied } />
        <Statistic name='Win percentage'
          stat={ winPercentage }/>
      </div>
    );
  }

  matches() {
    if (!this.props.currentTeam || !this.props.currentTeam.matchIds) return;

    const matchList = this.props.currentTeam.matchIds.map(
      id => {
        const match = this.props.matches[id];
        const team = this.props.teams[match.teamId];
        const opposingTeam = this.props.teams[match.opposingTeamId];
        const opponent = this.props.users[opposingTeam.userId];
        let editable = false;
        if (id === this.props.currentTeam.matchIds[0] && team.active && opposingTeam.active) {
          editable = true;
        }

        return <MatchListItem
          ladder={ this.props.ladder }
          key={ id }
          match={ match }
          team={ team }
          opposingTeam={ opposingTeam }
          opponent={ opponent }
          factions={ this.props.factions }
          ownerViewing= { this.props.ownerViewing }
          currentUser={ this.props.currentUser }
          editable={ editable } />;
      }
    );

    return (
      <div id='main-list'>
        <h2>Matches</h2>
        { matchList }
      </div>
    );
  }

  bbTeamHeader() {
    return; // not using this right now, not sure what the UI should look like


    if (!this.props.currentTeam) return;
    if (this.props.ladder !== '/bloodbowl') return;
    if (!this.props.currentTeam.bbStats) return;

    const team = this.props.currentTeam;
    const owner = this.props.users[team.userId];

    let editLink;
    let owned = '';
    let bottomLine = (
      <div className={ 'team-header-faction owned' }>
        <div>Nothing for now</div>
      </div>
    );

    if (this.props.ownerViewing && team.active) {
      editLink = <ImageButton
        path={ `${this.props.ladder}/team/${this.props.currentTeamId}/edit` }
        image={ window.edit_dark } />;
      owned = ' owned';
    } else {
      bottomLine =
      <div className={ 'team-header-faction owned' }>
        <div>Nothing for now</div>
        <div>Nor over here</div>
      </div>;
    }

    return (
      <div className={ 'info-container' + owned } id='team-details'>
        <div className={ 'team-header' + owned }>
          <div className={ 'team-header-name' + owned }>
            Blood Bowl team details
          </div>
          { bottomLine }
        </div>
        <div>
          { editLink }
        </div>
      </div>
    );
  }

  bbTeamDetails() {
    if (!this.props.currentTeam) return;
    if (this.props.ladder !== '/bloodbowl') return;
    if (!this.props.currentTeam.bbStats) return;
    const team = this.props.currentTeam;
    return <BBStatTable team={ team } />
  }

  playersHeader() {
    if (!this.props.currentTeam) return;
    if (this.props.ladder !== '/bloodbowl') return;

    const team = this.props.currentTeam;
    const owner = this.props.users[team.userId];

    let editLink;
    let owned = '';
    let bottomLine = (
      <div className={ 'team-header-faction owned' }>
        <div>Nothing for now</div>
      </div>
    );

    if (this.props.ownerViewing && team.active) {
      editLink = <ImageButton
        path={ `${this.props.ladder}/teamplayers/${this.props.currentTeamId}/edit` }
        image={ window.edit_dark } />;
      owned = ' owned';
    } else {
      bottomLine =
      <div className={ 'team-header-faction owned' }>
        <div>Nothing for now</div>
        <div>Nor over here</div>
      </div>;
    }

    return (
      <div className={ 'info-container' + owned } id='team-details'>
        <div className={ 'team-header' + owned }>
          <div className={ 'team-header-name' + owned }>
            Players
          </div>
          { bottomLine }
        </div>
        <div>
          { editLink }
        </div>
      </div>
    );
  }

  players() {
    if (!this.props.currentTeam) return;
    if (this.props.ladder !== '/bloodbowl') return;
    const playerIds = this.props.currentTeam.playerIds;
    const players = this.props.players;
    if (!playerIds || !players) return;
    return <PlayerCards players={ players } playerIds={ playerIds }/>;
  }

}

export default Team;
