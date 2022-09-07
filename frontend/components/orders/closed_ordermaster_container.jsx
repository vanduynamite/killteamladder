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

  const statusIdsToInclude = Object.keys(orderStatuses).filter((statusId) => {
    return orderStatuses[statusId].complete === true;
  });
  const itemsToInclude = Object.fromEntries(
    Object.entries(orderItems).filter((item) => {
      return statusIdsToInclude.includes(String(item[1].statusId));
    }));

  const screenData = {
    title: 'Closed orders',
    topLink : {
      text: '< Open orders',
      link: '/ordermaster/',
    },
    initialGroupIdField: 'statusId',
    fullWidthItems: true,
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
    clearCheckedItems: () => dispatch(clearCheckedItems()),
    getItems: () => dispatch(getOrdermasterItems('completed_items')),
  };
};

export default connect(msp, mdp)(Main);
