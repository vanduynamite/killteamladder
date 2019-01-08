import React from 'react';
import Statistic from '../general/statistic';
import ImageButton from '../general/image_button';
import ButtonLink from '../general/button_link';
// import SubmitButton from '../general/submit_button';
// import TeamListItem from '../teams/team_list_item';

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
    // { this.teamDetails() }
    // { this.retiredTeams() }
    // { SubmitButton('Log out', true, this.props.logout)}
  }

  // subcomponents

  teamDetails() {
    const team = this.props.teams[this.props.currentTeamId];
    const editLink = this.props.currentUser.id

    if (team === undefined) return <></>;
    return (
      <div className='info-container' id='account-details'>
        <div id='account-names'>
          { team.teamName }
          <br></br>
          { team.faction }
        </div>
        <div>
          { ImageButton(`/team/${team.id}/edit`, window.edit) }
        </div>
      </div>
    );
  }

  teamStats() {
    const team = this.props.teams[this.props.currentTeamId];
    if (team === undefined) return <></>;

  let winPercentage = Math.round((team.matchesWon / team.matchesPlayed) * 10000) / 100;
    winPercentage = winPercentage.toString() + '%';
    if (winPercentage === 'NaN%') winPercentage = 'Play a game!';

    return (
      <div className='info-container' id='account-stats'>
        <Statistic name='Games played (this season)' stat={ team.matchesPlayed }/>
        <Statistic name='Wins' stat={ team.matchesWon } grey={ true }/>
        <Statistic name='Losses' stat={ team.matchesLost }/>
        <Statistic name='Ties' stat={ team.matchesTied } grey={ true }/>
        <Statistic name='Win percentage' stat={ winPercentage }/>
      </div>
    );
  }

  matches() {
    // const matchList = Object.values(this.props.teams).map(
    //   team => {
    //     if (team.user === this.props.currentUser.id) return (
    //       <TeamListItem
    //         key={ team.id }
    //         team={ team }
    //         owner={ this.props.currentUser }
    //         currentUserId={ this.props.currentUser.id }/>
    //     );
    //   }
    // );

    const matchList = <></>;

    return (
      <div id='my-teams'>
        <h2>Matches</h2>
        { matchList }
      </div>
    );
  }

}

export default Account;
