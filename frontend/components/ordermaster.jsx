import { connect } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Account from './orders/account/account_container';
import ClosedOrders from './orders/closed_ordermaster_container';
import CreateInvoice from './orders/create_invoice_container';
import CreateShipment from './orders/create_shipment_container';
import CreateOrder from './orders/create_order_container';
import DeliverItems from './orders/deliver_items_container';
import EditAccount from './orders/account/edit_account_container';
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
        <ProtectedRoute path={ '/ordermaster/account/edit' } component={ EditAccount } />
        <ProtectedRoute path={ '/ordermaster/account' } component={ Account } />
        <ProtectedRoute path={ '/ordermaster/closed' } component={ ClosedOrders } />
        <ProtectedRoute path={ '/ordermaster/new' } component={ CreateOrder } />
        <ProtectedRoute path={ '/ordermaster/edit' } component={ EditOrders } />
        <ProtectedRoute path={ '/ordermaster/invoice' } component={ InvoiceItems } />
        <ProtectedRoute path={ '/ordermaster/createinvoice' } component={ CreateInvoice } />
        <ProtectedRoute path={ '/ordermaster/order' } component={ OrderItems } />
        <ProtectedRoute path={ '/ordermaster/ship' } component={ ShipItems } />
        <ProtectedRoute path={ '/ordermaster/createshipment' } component={ CreateShipment } />
        <ProtectedRoute path={ '/ordermaster/deliver' } component={ DeliverItems } />
        <ProtectedRoute path={ '/ordermaster/' } component={ OpenOrders } />
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
