import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { AuthRoute,
 ProtectedRoute } from '../util/route_util';
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

export default (props) => {
  const ladder = props.match.path;
  return (
    <Switch>
      <ProtectedRoute path={ `${ladder}/account/edit` } component={ EditAccount } />
      <ProtectedRoute path={ `${ladder}/account` } component={ Account } />
      <ProtectedRoute path={ `${ladder}/match/:matchId/edit` } component={ EditMatch } />
      <ProtectedRoute path={ `${ladder}/match/:matchId/delete` } component={ DeleteMatch } />
      <ProtectedRoute path={ `${ladder}/match/new` } component={ NewMatch } />
      <ProtectedRoute path={ `${ladder}/team/new` } component={ NewTeam } />
      <ProtectedRoute path={ `${ladder}/team/:teamId/edit` } component={ EditTeam } />
      <ProtectedRoute path={ `${ladder}/team/:teamId/retire` } component={ RetireTeam } />
      <Route path={ `${ladder}/team/:teamId` } component={ Team } />
      <Route path={ `${ladder}/` } component={ Main } />
    </Switch>
  );
};
