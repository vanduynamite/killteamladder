import {connect} from 'react-redux';
import {clearPathHistory} from '../../actions/ui_actions';
import {newInvoice} from '../../actions/invoice_actions';
import {newItemNotes} from '../../actions/item_note_actions';
import CreateInvoice from './create_invoice';

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
  const changeLinks = state.entities.changeLinks;
  const checkedItems = state.ui.checkedItems;
  const errors = state.errors.invoices;

  return {
    loggedIn,
    currentUser,
    users,
    items,
    notes,
    distributors,
    invoices,
    shipments,
    orderStatuses,
    changeLinks,
    checkedItems,
    errors,
  };
};

const mdp = dispatch => {
  return {
    clearPathHistory: () => dispatch(clearPathHistory()),
    newInvoice: (items, historyPush) => dispatch(newInvoice(items, historyPush, '/ordermaster/invoice')),
    newItemNotes: (items, historyPush) => dispatch(newItemNotes(items, historyPush, '/ordermaster/invoice')),
  };
};

export default connect(msp, mdp)(CreateInvoice);
