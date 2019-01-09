import React from 'react';
import Statistic from '../general/statistic';
import ImageButton from '../general/image_button';
import ButtonLink from '../general/button_link';
import MatchListItem from '../match/match_list_item';
// import SubmitButton from '../general/submit_button';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTeam(this.props.currentTeamId);
  }

  render() {
    return (
      <div className='frame'>
        <h1>
          Team details
        </h1>
        { this.teamDetails() }
        { this.teamStats() }
        { ButtonLink('Log a match', '/match/new', 'submit-active')}
        { this.matches() }
      </div>
    );
  }

  // subcomponents

  teamDetails() {
    if (!this.props.currentTeam) return;

    const editLink = this.props.ownerViewing ?
        <ImageButton
          path={ `/team/${this.props.currentTeamId}/edit` }
          image={ window.edit } /> : <></>;

    return (
      <div className='info-container' id='account-details'>
        <div id='account-names'>
          { this.props.currentTeam.teamName }
          <br></br>
          { this.props.currentTeam.faction }
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
        <Statistic name='Current standing' stat={ team.id } bold={ true }/>
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
          currentUser={ this.props.currentUser } />;
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
