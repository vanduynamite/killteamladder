import { connect } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Account from './account/account_container';
import ClosedOrders from './orders/closed_ordermaster_container';
import CreateOrder from './orders/create_order_container';
import DeliverItems from './orders/deliver_items_container';
import EditAccount from './account/edit_account_container';
import EditOrders from './orders/edit_ordermaster_container';
import InvoiceItems from './orders/invoice_items_container';
import OpenOrders from './orders/open_ordermaster_container';
import OrderItems from './orders/order_items_container';
import ShipItems from './orders/ship_items_container';

class Ordermaster extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <Switch>
        <Route path={ '/ordermaster/closed' } component={ ClosedOrders } />
        <Route path={ '/ordermaster/new' } component={ CreateOrder } />
        <Route path={ '/ordermaster/edit' } component={ EditOrders } />
        <Route path={ '/ordermaster/invoice' } component={ InvoiceItems } />
        <Route path={ '/ordermaster/createinvoice' } component={ InvoiceItems } />
        <Route path={ '/ordermaster/order' } component={ OrderItems } />
        <Route path={ '/ordermaster/ship' } component={ ShipItems } />
        <Route path={ '/ordermaster/deliver' } component={ DeliverItems } />
        <Route path={ '/ordermaster/' } component={ OpenOrders } />
      </Switch>
    );
  }
}

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  if (!loggedIn) return {loggedIn};

  const ordermaster = state.entities.users[state.session.id].ordermaster;
  if (!ordermaster) {
    ownProps.history.push('/orders/');
    return {};
  }

  return {};
};

const mdp = (dispatch) => {
  return {};
};

export default connect(msp, mdp)(Ordermaster);
