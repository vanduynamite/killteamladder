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
}

export default Account;
