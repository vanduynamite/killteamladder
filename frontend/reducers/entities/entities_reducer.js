import { combineReducers } from 'redux';
import users from './users_reducer';
import teams from './teams_reducer';

const entitiesReducer = combineReducers({
  users,
  teams,
});

export default entitiesReducer;
