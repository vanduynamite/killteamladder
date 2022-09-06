import React from 'react';
import ButtonLink from '../../general/button_link';
import SubmitButton from '../../general/submit_button';
import ImageButton from '../../general/image_button';
import TeamListItem from '../../teams/team_list_item';
import Statistic from '../../general/statistic';

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
    const stats = this.props.currentUser.stats;
    if (!stats) return;
    
    return (
      <div className='info-container' id='account-stats'>
        <Statistic name='Items awaiting invoice' stat={ stats.newItems }/>
        <Statistic name='Items awaiting order' stat={ stats.invoicedItems } grey={ true }/>
        <Statistic name='Items awaiting shipping' stat={ stats.orderedItems }/>
        <Statistic name='Items awaiting deliver' stat={ stats.shippedItems } grey={ true }/>
        <Statistic name='Items in limbo' stat={ stats.issueItems }/>
      </div>
    );
  }
}

export default Account;
