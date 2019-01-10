import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import teams from './teams_errors_reducer';
import match from './match_errors_reducer';

const errorsReducer = combineReducers({
  session,
  teams,
  match,
});

export default errorsReducer;
