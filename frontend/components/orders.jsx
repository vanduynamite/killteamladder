import { connect } from 'react-redux';
import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import Main from './orders/order_main_container';
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
        <Route path={ '/' } component={ Main } />
      </Switch>
    );
  }
  // <ProtectedRoute path={ 'account/edit' } component={ EditAccount } />
  // <ProtectedRoute path={ 'account' } component={ Account } />
}

const msp = (state, ownProps) => {};

const mdp = (dispatch) => {};

export default connect(msp, mdp)(Orders);
