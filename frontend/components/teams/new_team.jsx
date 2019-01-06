import React from 'react';

class NewTeam extends React.Component {

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
          Create team
        </h1>
        { `Hi, want to create a team?` }
      </div>
    );
  }
}

export default NewTeam;
