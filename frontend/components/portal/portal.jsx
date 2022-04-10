import React from 'react';
import { Link } from 'react-router-dom';

class Portal extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
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
          <h2>Orders</h2>
          <Link to='/orders/'>
            <img src={ window.orders_icon } id='logo' />
          </Link>
          { orderMasterEl }
          <h2>Killteam Ladder</h2>
          <Link to='/killteam/'>
            <img src={ window.killteam_logo } id='logo' />
          </Link>
          <h2>Warhammer Underworlds Ladder</h2>
          <Link to='/underworlds/'>
            <img src={ window.underworlds_logo } id='logo' />
          </Link>
          <h2>40k ITC Ladder</h2>
          <h4>Ladder for the 2020 40k challenge league</h4>
          <Link to='/40k/'>
            <img src={ window.warhammer40k_logo } id='logo' />
          </Link>
        </div>
      </div>
    );
  }

}

export default Portal;
