import React from 'react';
import Statistic from '../general/statistic';
import ImageButton from '../general/image_button';
import ButtonLink from '../general/button_link';
import MatchListItem from '../match/match_list_item';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    if (this.props.cameFromNewMatch) {
      this.props.setPathHistory({ team: this.props.currentTeamId });
      this.props.history.push('/match/new');
    }
    this.props.getTeam(this.props.currentTeamId);
  }

  componentDidUpdate(oldProps) {
    if (this.props.currentTeamId !== oldProps.currentTeamId) {
      this.props.getTeam(this.props.currentTeamId);
    }
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/match/new') {
      this.props.setPathHistory({ team: this.props.currentTeamId });
    }
  }

  render() {

    let logMatchButton;
    if (this.props.currentTeam && this.props.currentUser) {
      if (this.props.currentTeam.userId === this.props.currentUser.id) {
        logMatchButton = <ButtonLink text='Log a match' path='/match/new' type='submit-active'/>;
      }
    }

    return (
      <div className='frame'>
        <h1>
          Team details
        </h1>
        { this.teamDetails() }
        { this.teamStats() }
        { logMatchButton }
        { this.matches() }
      </div>
    );
  }

  // subcomponents

  teamDetails() {
    if (!this.props.currentTeam) return;

    const team = this.props.currentTeam;
    const owner = this.props.users[team.userId];
    const fullName = this.props.currentUser ?
      `${owner.firstName} ${owner.lastName}` :
      '';

    let editLink;
    let owned = '';
    let bottomLine =
      <div className={ 'team-header-faction owned' }>
        <div>{ team.faction }</div>
      </div>;
    if (this.props.ownerViewing) {
      editLink = <ImageButton
        path={ `/team/${this.props.currentTeamId}/edit` }
        image={ window.edit_dark } />;
      owned = ' owned';
    } else {
      bottomLine =
      <div className={ 'team-header-faction owned' }>
        <div>{ team.faction }</div>
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
    const team = this.props.currentTeam;

    let winPercentage = Math.round((team.matchesWon / team.matchesPlayed) * 10000) / 100;
      winPercentage = winPercentage.toString() + '%';
      if (winPercentage === 'NaN%') winPercentage = 'Play a game!';

    return (
      <div className='info-container' id='account-stats'>
        <Statistic name='Current standing' stat={ team.rank } bold={ true }/>
        <Statistic name='Total points' stat={ team.points } grey={ true } bold={ true }/>
        <Statistic name='Games played (this season)' stat={ team.matchesPlayed }/>
        <Statistic name='Wins' stat={ team.matchesWon } grey={ true }/>
        <Statistic name='Losses' stat={ team.matchesLost }/>
        <Statistic name='Ties' stat={ team.matchesTied } grey={ true }/>
        <Statistic name='Win percentage' stat={ winPercentage }/>
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

        return <MatchListItem
          key={ id }
          match={ match }
          team={ team }
          opposingTeam={ opposingTeam }
          opponent={ opponent }
          ownerViewing= { this.props.ownerViewing }
          currentUser={ this.props.currentUser }
          editable={ id === this.props.currentTeam.matchIds[0] } />;
      }
    );

    return (
      <div id='main-list'>
        <h2>Matches</h2>
        { matchList }
      </div>
    );
  }

}

export default Account;
