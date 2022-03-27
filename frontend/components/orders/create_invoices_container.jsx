import {connect} from 'react-redux';
import {clearPathHistory, toggleCheckedItem, clearCheckedItems} from '../../actions/ui_actions';
import {getOrdermasterItems} from '../../actions/order_item_actions';
import InvoiceList from './create_invoices';

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

  const screenData = {
    title: 'Create invoices',
    orderStatuses,
    topLink : {
      text: '< Open orders',
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

export default connect(msp, mdp)(InvoiceList);
