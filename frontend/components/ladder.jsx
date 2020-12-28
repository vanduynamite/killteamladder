import { connect } from 'react-redux';
import { getFactions } from '../actions/team_actions';
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
import EditPlayers from './players/edit_players_container';
import RetireTeam from './teams/retire_team_container';
import Team from './teams/team_container';
import EditPlayer from './players/edit_player_container';
import NewPlayer from './players/new_player_container';
import NewAdvancement from './advancements/new_advancement_container';


class Ladder extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getFactions(this.props.ladder);
  }

  render() {
    if (!this.props.receivedFactions) return <></>;
    const ladder = this.props.ladder;
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
        <ProtectedRoute path={ `/bloodbowl/teamplayers/:teamId/edit` } component={ EditPlayers } />
        <ProtectedRoute path={ `/bloodbowl/teamplayers/:teamId/editposition/:playerId` } component={ EditPlayer } />
        <ProtectedRoute path={ `/bloodbowl/teamplayers/:teamId/addposition/:templateId` } component={ NewPlayer } />
        <ProtectedRoute path={ `/bloodbowl/advancements/:playerId` } component={ NewAdvancement } />
        <Route path={ `${ladder}/team/:teamId` } component={ Team } />
        <Route path={ `${ladder}/` } component={ Main } />
      </Switch>
    );
  }
}

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path;
  const receivedFactions = Object.keys(state.entities.factions).length != 0;
  return {
    ladder,
    receivedFactions,
  };
};

const mdp = (dispatch) => {
  return {
    getFactions: (ladder) => dispatch(getFactions(ladder)),
  };
};

export default connect(msp, mdp)(Ladder);
