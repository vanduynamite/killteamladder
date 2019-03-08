import React from 'react';
import Statistic from '../general/statistic';
import ImageButton from '../general/image_button';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';

class Team extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTeam(this.props.currentTeamId);
  }

  componentDidUpdate(oldProps) {
    if (this.props.currentTeamId !== oldProps.currentTeamId) {
      this.props.getTeam(this.props.currentTeamId);
    }
  }

  submit() {
    const team = {
      id: this.props.currentTeamId,
      teamName: this.props.currentTeam.teamName,
      active: false,
    };
    this.props.editTeam(team, this.props.history.push);
  }

  render() {

    const descText = 'Stats will remain viewable for a retired team, but no match results against a retired team will be able to be logged or edited.';
    const warningText = 'There is no way to move a team out of retirement.';

    return (
      <div className='frame'>
        <h1>
          Retire team
        </h1>
        { this.teamDetails() }
        { this.teamStats() }
        <div id='retire-desc-text'>{ descText }</div>
        <div id='errors' className='retire-text'>{ warningText }</div>
        <div className='form-buttons'>
          <ButtonLink text='Cancel' path={ `${this.props.ladder}/team/${this.props.currentTeamId}/` } type='cancel' />
          <SubmitButton text='Retire forever'
            active={ this.props.ownerViewing }
            action={ this.submit.bind(this) }/>
        </div>
      </div>
    );
  }

  // subcomponents

  teamDetails() {
    if (!this.props.currentTeam) return;

    const team = this.props.currentTeam;

    let editLink;
    let owned = '';
    let bottomLine =
      <div className={ 'team-header-faction owned' }>
        <div>{ team.faction }</div>
      </div>;
    if (this.props.ownerViewing) {
      editLink = <ImageButton
        path={ `${this.props.ladder}/team/${this.props.currentTeamId}/edit` }
        image={ window.edit_dark } />;
      owned = ' owned';
    }

    return (
      <div className={ 'info-container' + owned } id='team-details'>
        <div className={ 'team-header' + owned }>
          <div className={ 'team-header-name' + owned }>
            { team.teamName }
          </div>
          { bottomLine }
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

}

export default Team;
