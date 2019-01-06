import React from 'react';

class Account extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const greeting = this.props.loggedIn ?
      ` ${this.props.currentUser.firstName}` :
      '';

    return (
      <div className='frame'>
        <h1>
          My account
        </h1>
        { `Hi${greeting}!` }
        <button className='button submit-active'
          onClick={ this.props.logout }>
          Log out
        </button>
      </div>
    );
  }
}

export default Account;
