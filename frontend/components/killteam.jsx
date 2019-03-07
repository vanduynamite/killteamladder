import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute,
 ProtectedRoute } from '../util/route_util';
import Login from './auth/login_container';
import Signup from './auth/signup_container';
import Main from './main/main_container';
import Account from './account/account_container';
import EditAccount from './account/edit_account_container';
import NewMatch from './match/new_match_container';
import EditMatch from './match/edit_match_container';
import DeleteMatch from './match/delete_match_container';
import NewTeam from './teams/new_team_container';
import EditTeam from './teams/edit_team_container';
import RetireTeam from './teams/retire_team_container';
import Team from './teams/team_container';

export default () => {

  return (
    <>
      <Switch>
        <AuthRoute exact path='/killteam/login' component={ Login } />
        <AuthRoute exact path='/killteam/signup' component={ Signup } />
        <ProtectedRoute path='/killteam/account/edit' component={ EditAccount } />
        <ProtectedRoute path='/killteam/account' component={ Account } />
        <ProtectedRoute path='/killteam/match/:matchId/edit' component={ EditMatch } />
        <ProtectedRoute path='/killteam/match/:matchId/delete' component={ DeleteMatch } />
        <ProtectedRoute path='/killteam/match/new' component={ NewMatch } />
        <ProtectedRoute path='/killteam/team/new' component={ NewTeam } />
        <ProtectedRoute path='/killteam/team/:teamId/edit' component={ EditTeam } />
        <ProtectedRoute path='/killteam/team/:teamId/retire' component={ RetireTeam } />
        <Route path='/killteam/team/:teamId' component={ Team } />
        <Route path='/killteam/' component={ Main } />
      </Switch>
    </>
  );
};
