import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import NewTeam from './new_team';
import { newTeam } from '../../actions/team_actions';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1)); //console.log(ladder);
  const errors = state.errors.teams || {};

  return {
    ladder,
    errors,
  };
};

const mdp = dispatch => {
  return {
    newTeam: (team, historyPush) => dispatch(newTeam(team, historyPush)),
  };
};

export default withRouter(connect(msp, mdp)(NewTeam));
