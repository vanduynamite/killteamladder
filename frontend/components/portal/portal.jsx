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
          <h2>
            Killteam Ladder
          </h2>
          <Link to='/killteam/'>
            <img src={ window.killteam_logo } id='logo' />
          </Link>
          <h2>
            Warhammer Underworlds Ladder
          </h2>
          <Link to='/underworlds/'>
            <img src={ window.underworlds_logo } id='logo' />
          </Link>
          <h2>
            40k ITC Ladder
          </h2>
          <h4>
            ITC Champions missions at 2000 pts, or at least 1500 if both parties agree
          </h4>
          <Link to='/40k/'>
            <img src={ window.warhammer40k_logo } id='logo' />
          </Link>
        </div>
      </div>
    );
  }

}

export default Portal;
