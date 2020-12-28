import { combineReducers } from 'redux';
import users from './users_reducer';
import teams from './teams_reducer';
import matches from './matches_reducer';
import factions from './factions_reducer';
import players from './players_reducer';
import templates from './templates_reducer';
import advancements from './advancements_reducer';
import skills from './skills_reducer';

const entitiesReducer = combineReducers({
  users,
  teams,
  matches,
  factions,
  players,
  templates,
  advancements,
  skills,
});

export default entitiesReducer;
