import React from 'react';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import ImageButton from '../general/image_button';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getUser(this.props.currentUser.id);
  }

  render() {

    return (
      <div className='frame'>
        <h1>
          My account
        </h1>
        { this.accountDetails() }
        { this.accountStats() }
        { ButtonLink('Create a team', '/team/new', 'submit-active')}
        { this.teamDetails() }
        { this.retiredTeams() }
        { SubmitButton('Log out', true, this.props.logout)}
      </div>
    );
  }

  // subcomponents

  accountDetails() {
    const fullName = `${this.props.currentUser.firstName} ${this.props.currentUser.lastName}`

    return (
      <div className='info-container' id='account-details'>
        <div id='account-names'>
          { fullName }
          <br></br>
          { this.props.currentUser.email }
        </div>
        <div>
          { ImageButton('/account/edit', window.edit) }
        </div>
      </div>
    );
  }

  accountStats() {
    return (
      <div className='info-container' id='account-stats'>
        { this.statistic('Total games played (all time)', 16)}
        { this.statistic('Wins', 8, true)}
        { this.statistic('Losses', 6)}
        { this.statistic('Ties', 2, true)}
        { this.statistic('Win percentage', '56.25%')}
      </div>
    );
  }

  teamDetails() {
    return <h2>My teams</h2>;
  }

  retiredTeams() {
    return <h2>Retired teams</h2>;
  }

  statistic(name, stat, grey) {
    let klass = 'stat-container';
    if (grey) klass += ' grey';

    return (
      <div className={ klass }>
        <div>{ name }</div>
        <div>{ stat }</div>
      </div>
    );
  }

}

export default Account;
