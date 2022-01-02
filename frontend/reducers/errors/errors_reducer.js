import {combineReducers} from 'redux';
import session from './session_errors_reducer';
import teams from './teams_errors_reducer';
import match from './match_errors_reducer';
import order_items from './order_items_errors_reducer';
import invoices from './invoices_errors_reducer';
import shipments from './shipments_errors_reducer';

const errorsReducer = combineReducers({
  session,
  teams,
  match,
  order_items,
  invoices,
  shipments,
});

export default errorsReducer;
