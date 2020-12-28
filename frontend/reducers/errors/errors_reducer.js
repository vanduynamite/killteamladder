import { combineReducers } from 'redux';
import session from './session_errors_reducer';
import teams from './teams_errors_reducer';
import match from './match_errors_reducer';
import players from './players_errors_reducer';
import advancements from './advancements_errors_reducer';

const errorsReducer = combineReducers({
  session,
  teams,
  match,
  players,
  advancements,
});

export default errorsReducer;
