import {connect} from 'react-redux';
import {clearPathHistory, toggleCheckedItem, clearCheckedItems} from '../../actions/ui_actions';
import {getOrdermasterItems} from '../../actions/order_item_actions';
import Main from './order_main';

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  if (!loggedIn) return {loggedIn};

  const currentUser = state.entities.users[state.session.id];
  const users = state.entities.users;

  const orderItems = state.entities.orderItems;
  const itemNotes = state.entities.itemNotes;
  const distributors = state.entities.distributors;
  const invoices = state.entities.invoices;
  const shipments = state.entities.shipments;
  const orderStatuses = state.entities.orderStatuses;
  const checkedItems = state.ui.checkedItems;

  const statusNamesToInclude = ['shipped'];
  const itemsToInclude = Object.fromEntries(
    Object.entries(orderItems).filter((item) => {
      const statusName = orderStatuses[item[1].statusId].searchName;
      return statusNamesToInclude.includes(statusName);
    }));
  const statusesToInclude = Object.fromEntries(
    Object.entries(orderStatuses).filter((status) => {
      return status[1].complete === false;
    }));

  const ordermasterNavButtons = [
    {text: 'Invoice', path: '/ordermaster/invoice', active: true},
    {text: 'Order', path: '/ordermaster/order', active: true},
    {text: 'Ship', path: '/ordermaster/ship', active: true},
    {text: 'Deliver', path: '/ordermaster/deliver', active: false},
  ];

  const screenData = {
    title: 'Deliver items',
    statusesToInclude,
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
    getItems: () => dispatch(getOrdermasterItems('shipped_items')),
  };
};

export default connect(msp, mdp)(Main);
