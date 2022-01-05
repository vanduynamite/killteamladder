import { connect } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import OpenOrders from './orders/open_orders_container';
import ClosedOrders from './orders/closed_orders_container';
import CreateOrder from './orders/create_order_container';
import Account from './account/account_container';
import EditAccount from './account/edit_account_container';

class Orders extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route path={ '/orders/closed' } component={ ClosedOrders } />
        <Route path={ '/orders/new' } component={ CreateOrder } />
        <Route path={ '/orders/edit' } component={ ClosedOrders } />
        <Route path={ '/orders/' } component={ OpenOrders } />
      </Switch>
    );
  }
  // <ProtectedRoute path={ 'account/edit' } component={ EditAccount } />
  // <ProtectedRoute path={ 'account' } component={ Account } />
}

const msp = (state, ownProps) => {
  return {};
};

const mdp = (dispatch) => {
  return {};
};

export default connect(msp, mdp)(Orders);
