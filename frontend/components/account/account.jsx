import React from 'react';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import ImageButton from '../general/image_button';
import TeamListItem from '../teams/team_list_item';
import Statistic from '../general/statistic';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser(this.props.currentUser.id, this.props.ladder);
  }

  render() {

    return (
      <div className='frame'>
        <h1>
          My account
        </h1>
        { this.accountDetails() }
        { this.accountStats() }
        <ButtonLink text='Create a team' path={ `${this.props.ladder}/team/new` } type='submit-active' />
        { this.teamDetails() }
        { this.retiredTeams() }
        <SubmitButton text='Log out' active={ true } action={ this.props.logout } />
      </div>
    );
  }

  // subcomponents

  accountDetails() {
    const fullName = `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`;

    return (
      <div className='info-container' id='account-details'>
        <div id='account-names'>
          { fullName }
          <br></br>
          { this.props.currentUser.email }
        </div>
        <div>
          <ImageButton path={`${this.props.ladder}/account/edit`} image={ window.edit } />
        </div>
      </div>
    );
  }

  accountStats() {
    const user = this.props.currentUser;
    let winPercentage = Math.round((user.matchesWon / user.matchesPlayed) * 10000) / 100;
    winPercentage = winPercentage.toString() + '%';
    if (winPercentage === 'NaN%') winPercentage = 'Play a game!';

    return (
      <div className='info-container' id='account-stats'>
        <Statistic name='Total games played (this season)' stat={ user.matchesPlayed }/>
        <Statistic name='Wins' stat={ user.matchesWon } grey={ true }/>
        <Statistic name='Losses' stat={ user.matchesLost } />
        <Statistic name='Ties' stat={ user.matchesTied } grey={ true }/>
        <Statistic name='Win percentage' stat={ winPercentage }/>
      </div>
    );
  }

  teamDetails() {
    if (!this.props.currentUser.teamIds) return;

    const teamList = this.props.currentUser.teamIds.map(
      teamId => {
        const team = this.props.teams[teamId];
        if (team.ladder !== this.props.ladder || !team.active) return;
        return (
          <TeamListItem
          ladder={ this.props.ladder }
          key={ teamId }
          team={ team }
          owner={ this.props.currentUser }
          currentUserId={ this.props.currentUser.id }/>
        );
      }
    );

    return (
      <div id='main-list'>
        <h2>My teams</h2>
        { teamList }
      </div>
    );
  }

  retiredTeams() {
    if (!this.props.currentUser.retiredTeamIds) return;

    const teamList = this.props.currentUser.retiredTeamIds.map(
      teamId => {
        const team = this.props.teams[teamId];
        if (team.ladder !== this.props.ladder || team.active) return;
        return (
          <TeamListItem
            ladder={ this.props.ladder }
            key={ teamId }
            team={ team }
            owner={ this.props.currentUser }
            currentUserId={ this.props.currentUser.id }
            active={ false }/>
        );
      }
    );

    return (
      <div id='main-list-retired'>
        <h2>Retired teams</h2>
        { teamList }
      </div>
    );
  }

}

export default Account;
