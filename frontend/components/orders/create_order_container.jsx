import {connect} from 'react-redux';
import {clearPathHistory} from '../../actions/ui_actions';
import {newItems} from '../../actions/order_item_actions';
import CreateOrder from './create_order';

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  if (!loggedIn) return {loggedIn};

  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  const errors = state.errors.order_items;

  return {
    loggedIn,
    currentUser,
    errors,
  };
};

const mdp = (dispatch, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1)) + '/';
  return {
    clearPathHistory: () => dispatch(clearPathHistory()),
    newItems: (items, historyPush) => dispatch(newItems(items, historyPush, ladder)),
  };
};

export default connect(msp, mdp)(CreateOrder);
