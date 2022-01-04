import {connect} from 'react-redux';
import {clearPathHistory, toggleCheckedItem, clearCheckedItems} from '../../actions/ui_actions';
import {getItems} from '../../actions/order_item_actions';
import Main from './order_main';

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];
  const users = state.entities.users;

  const orderItemsArray = Object.entries(state.entities.orderItems)
    .filter((item) => {
      return item[1].userId === currentUser.id;
    });
  const orderItems = Object.fromEntries(orderItemsArray);
  const itemNotes = state.entities.itemNotes;
  const distributors = state.entities.distributors;
  const invoices = state.entities.invoices;
  const shipments = state.entities.shipments;
  const orderStatuses = state.entities.orderStatuses;

  const checkedItems = state.ui.checkedItems;

  return {
    loggedIn,
    currentUser,
    users,
    items: orderItems,
    notes: itemNotes,
    distributors,
    invoices,
    shipments,
    statuses: orderStatuses,
    checkedItems,
  };
};

const mdp = dispatch => {
  return {
    clearPathHistory: () => dispatch(clearPathHistory()),
    toggleCheckedItem: (itemId) => dispatch(toggleCheckedItem(itemId)),
    clearCheckedItems: () => dispatch(clearCheckedItems()),
    getItems: () => dispatch(getItems()),
  };
};

export default connect(msp, mdp)(Main);
