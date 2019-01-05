import React from 'react';

class Main extends React.Component {

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
          Rankings
        </h1>
        { `Hi${greeting}!` }
      </div>
    );
  }
}

export default Main;
