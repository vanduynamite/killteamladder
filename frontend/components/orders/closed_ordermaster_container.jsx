import {connect} from 'react-redux';
import {clearPathHistory, toggleCheckedItem, clearCheckedItems} from '../../actions/ui_actions';
import {getOrdermasterItems} from '../../actions/order_item_actions';
import Main from './order_main';

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  if (!loggedIn) return {loggedIn};

  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];
  const users = state.entities.users;

  const orderItems = state.entities.orderItems;
  const itemNotes = state.entities.itemNotes;
  const distributors = state.entities.distributors;
  const invoices = state.entities.invoices;
  const shipments = state.entities.shipments;
  const orderStatuses = state.entities.orderStatuses;

  const checkedItems = state.ui.checkedItems;
  const statusesToInclude = Object.fromEntries(
    Object.entries(orderStatuses).filter((status) => {
      return status[1].complete === true;
    }));

  const screenData = {
    title: 'Closed orders',
    statusesToInclude,
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
    clearCheckedItems: () => dispatch(clearCheckedItems()),
    getItems: () => dispatch(getOrdermasterItems('completed_items')),
  };
};

export default connect(msp, mdp)(Main);
