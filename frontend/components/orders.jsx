import { connect } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import OpenOrders from './orders/open_orders_container';
import ClosedOrders from './orders/closed_orders_container';
import CreateOrder from './orders/create_order_container';
import EditOrders from './orders/edit_orders_container';
import Account from './orders/account/account_container';
import EditAccount from './orders/account/edit_account_container';

class Orders extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Switch>
        <ProtectedRoute path={ '/orders/account/edit' } component={ EditAccount } />
        <ProtectedRoute path={ '/orders/account' } component={ Account } />
        <Route path={ '/orders/closed' } component={ ClosedOrders } />
        <Route path={ '/orders/new' } component={ CreateOrder } />
        <Route path={ '/orders/edit' } component={ EditOrders } />
        <Route path={ '/orders/' } component={ OpenOrders } />
      </Switch>
    );
  }
}

const msp = (state, ownProps) => {
  return {};
};

const mdp = (dispatch) => {
  return {};
};

export default connect(msp, mdp)(Orders);
