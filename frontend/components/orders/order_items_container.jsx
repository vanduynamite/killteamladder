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

  const statusesToInclude = [
    'awaiting_order',
    'awaiting_preorder',
    'preordered',
    'backordered',
  ];
  const itemsToInclude = Object.fromEntries(
    Object.entries(orderItems).filter((item) => {
      const statusName = orderStatuses[item[1].statusId].searchName;
      return statusesToInclude.includes(statusName);
    }));

  const ordermasterNavButtons = [
    {text: 'Invoice', path: '/ordermaster/invoice', active: true},
    {text: 'Order', path: '/ordermaster/', active: false},
    {text: 'Ship', path: '/ordermaster/ship', active: true},
    {text: 'Deliver', path: '/ordermaster/deliver', active: true},
  ];

  const screenData = {
    title: 'Order items',
    ordermasterNavButtons,
    topLink : {
      text: 'Completed orders >',
      link: '/ordermaster/closed',
    },
    initialGroupIdField: 'distributorId',
  };

  return {
    checkedItems,
    currentUser,
    distributors,
    invoices,
    loggedIn,
    items: itemsToInclude,
    notes: itemNotes,
    screenData,
    shipments,
    statuses: orderStatuses,
    users,
  };
};

const mdp = dispatch => {
  return {
    clearPathHistory: () => dispatch(clearPathHistory()),
    toggleCheckedItem: (itemId) => dispatch(toggleCheckedItem(itemId)),
    clearCheckedItems: () => dispatch(clearCheckedItems()),
    getItems: () => dispatch(getOrdermasterItems('invoiced_items')),
  };
};

export default connect(msp, mdp)(Main);
