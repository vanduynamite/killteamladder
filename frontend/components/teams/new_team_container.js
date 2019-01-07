import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewTeam from './new_team';
import { newTeam } from '../../actions/teams_actions';

const msp = state => {
  const errors = state.errors.newTeam || {};

  return {
    errors,
  };
};

const mdp = dispatch => {
  return {
    newTeam: team => dispatch(newTeam(team)),
  };
};

export default withRouter(connect(msp, mdp)(NewTeam));
