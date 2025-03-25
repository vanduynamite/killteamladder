import React from 'react';
import { Link } from 'react-router-dom';

class Portal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let orderEl;
    if (this.props.loggedIn && this.props.currentUser.canOrder) {
      orderEl = (<><h2>Orders</h2><Link to='/orders/'>
        <img src={ window.orders_icon } id='logo' /></Link></>);
    }

    let orderMasterEl;
    if (this.props.loggedIn && this.props.currentUser.ordermaster) {
      orderMasterEl = (<><h2>Ordermaster</h2><Link to='/ordermaster/'>
        <img src={ window.carcosa_logo } id='logo' /></Link></>);
    }
    return (
      <div className='frame'>
        <h1>
          Carcosa Club Portal
        </h1>
        <div id='ranking-list'>
          { orderEl }
          { orderMasterEl }
          <h2>Killteam Ladder</h2>
          <Link to='/killteam/'>
            <img src={ window.killteam_logo } id='logo' />
          </Link>
          <h2>40k League Ladder</h2>
          <h4>Spring 2025 Season</h4>
          <Link to='/40k/'>
            <img src={ window.warhammer40k_logo } id='logo' />
          </Link>
          <h2>Aeronautica Ladder</h2>
          <Link to='/aeronautica/'>
            <img src={ window.aeronautica_logo } id='logo' />
          </Link>
        </div>
      </div>
    );
  }
  // Underworlds is not currently being played very much
          // <h2>Warhammer Underworlds Ladder</h2>
          // <Link to='/underworlds/'>
          //   <img src={ window.underworlds_logo } id='logo' />
          // </Link>

}

export default Portal;
