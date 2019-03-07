import React from 'react';
import { Link } from 'react-router-dom';

class Portal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='frame'>
        <h1>
          Carcosa Club Portal
        </h1>
        <div id='ranking-list'>
          <h3>
            Welcome to the Carcosa Club member's portal!
            Click below on the area you want to navigate to.
          </h3>
          <h2>
            Killteam Ladder
          </h2>
          <Link to='/killteam/'>
            <img src={ window.logo } id='logo' />
          </Link>
        </div>
      </div>
    );
  }

}

export default Portal;
