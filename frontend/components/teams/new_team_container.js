import { connect } from 'react-redux';
import NewTeam from './new_team';

const msp = state => {
  const errors = state.errors.newTeam || {};
  
  return {
    errors,
  };
};

const mdp = dispatch => {
  return {

  };
};

export default connect(msp, mdp)(NewTeam);
