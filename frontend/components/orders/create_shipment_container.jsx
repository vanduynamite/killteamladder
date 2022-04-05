import {connect} from 'react-redux';
import {clearPathHistory} from '../../actions/ui_actions';
import {newShipment} from '../../actions/shipment_actions';
import {newItemNotes} from '../../actions/item_note_actions';
import CreateShipment from './create_shipment';

const msp = (state, ownProps) => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;
  if (!loggedIn) return {loggedIn};

  let currentUser;
  if (loggedIn) currentUser = state.entities.users[state.session.id];

  const users = state.entities.users;
  const items = state.entities.orderItems;
  const notes = state.entities.itemNotes;
  const distributors = state.entities.distributors;
  const invoices = state.entities.invoices;
  const shipments = state.entities.shipments;
  const orderStatuses = state.entities.orderStatuses;
  const checkedItems = state.ui.checkedItems;
  const errors = state.errors.invoices;

  return {
    currentUser,
    checkedItems,
    distributors,
    errors,
    invoices,
    items,
    loggedIn,
    notes,
    orderStatuses,
    shipments,
    users,
  };
};

const mdp = dispatch => {
  return {
    clearPathHistory: () => dispatch(clearPathHistory()),
    newShipment: (items, historyPush) => dispatch(newShipment(items, historyPush, '/ordermaster/ship')),
    newItemNotes: (items, historyPush) => dispatch(newItemNotes(items, historyPush, '/ordermaster/ship')),
  };
};

export default connect(msp, mdp)(CreateShipment);
