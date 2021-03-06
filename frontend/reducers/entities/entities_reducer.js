import { combineReducers } from 'redux';
import users from './users_reducer';
import teams from './teams_reducer';
import matches from './matches_reducer';
import factions from './factions_reducer';

const entitiesReducer = combineReducers({
  users,
  teams,
  matches,
  factions,
});

export default entitiesReducer;
