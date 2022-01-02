import {combineReducers} from 'redux';
import users from './users_reducer';
import teams from './teams_reducer';
import matches from './matches_reducer';
import factions from './factions_reducer';
import orderItems from './order_items_reducer';
import itemNotes from './item_notes_reducer';
import distributors from './distributors_reducer';
import invoices from './invoices_reducer';
import shipments from './shipments_reducer';
import orderStatuses from './order_statuses_reducer';
import changeLinks from './change_links_reducer';

const entitiesReducer = combineReducers({
  users,
  teams,
  matches,
  factions,
  orderItems,
  itemNotes,
  distributors,
  invoices,
  shipments,
  orderStatuses,
  changeLinks,
});

export default entitiesReducer;
