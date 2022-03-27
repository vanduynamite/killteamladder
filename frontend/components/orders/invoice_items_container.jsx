import {connect} from 'react-redux';
import {clearPathHistory, toggleCheckedItem, clearCheckedItems} from '../../actions/ui_actions';
import {getOrdermasterItems} from '../../actions/order_item_actions';
import InvoiceItems from './invoice_items';

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  if (!loggedIn) return {loggedIn};

  const currentUser = state.entities.users[state.session.id];
  const users = state.entities.users;

  const orderItems = state.entities.orderItems;
  const itemNotes = state.entities.itemNotes;
  const distributors = state.entities.distributors;
  const orderStatuses = state.entities.orderStatuses;

  const checkedItems = state.ui.checkedItems;
  const itemsToInclude = Object.fromEntries(
    Object.entries(orderItems).filter((item) => {
      return orderStatuses[item[1].statusId].searchName === 'awaiting_invoice';
    }));

  const ordermasterNavButtons = [
    {text: 'Invoice', path: '/ordermaster/invoice', active: false},
    {text: 'Order', path: '/ordermaster/order', active: true},
    {text: 'Ship', path: '/ordermaster/ship', active: true},
    {text: 'Deliver', path: '/ordermaster/deliver', active: true},
  ];

  const screenData = {
    title: 'Create invoices',
    ordermasterNavButtons,
    topLink : {
      text: '< All open orders',
      link: '/ordermaster/',
    },
  };

  return {
    screenData,
    loggedIn,
    currentUser,
    users,
    items: itemsToInclude,
    notes: itemNotes,
    distributors,
    checkedItems,
  };
};

const mdp = dispatch => {
  return {
    clearPathHistory: () => dispatch(clearPathHistory()),
    toggleCheckedItem: (itemId) => dispatch(toggleCheckedItem(itemId)),
    clearCheckedItems: () => dispatch(clearCheckedItems()),
    getItems: () => dispatch(getOrdermasterItems('new_items')),
  };
};

export default connect(msp, mdp)(InvoiceItems);
