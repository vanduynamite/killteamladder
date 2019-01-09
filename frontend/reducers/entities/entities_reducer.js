import { combineReducers } from 'redux';
import users from './users_reducer';
import teams from './teams_reducer';
import matches from './matches_reducer';

const entitiesReducer = combineReducers({
  users,
  teams,
  matches,
});

export default entitiesReducer;
