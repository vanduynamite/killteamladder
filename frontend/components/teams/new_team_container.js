import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewTeam from './new_team';
import { newTeam } from '../../actions/team_actions';

const msp = state => {
  const errors = state.errors.teams || {};

  return {
    errors,
  };
};

const mdp = dispatch => {
  return {
    newTeam: (team, historyPush) => dispatch(newTeam(team, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(NewTeam));
