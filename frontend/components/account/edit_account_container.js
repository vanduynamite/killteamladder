import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearSessionErrors } from '../../actions/session_actions';
import {
  getUser,
  editUser
 } from '../../actions/user_actions';
import EditAccount from '../auth/signup';

const msp = (state, ownProps) => {
  const ladder = ownProps.match.path.slice(0,ownProps.match.path.indexOf('/', 1));
  const errors = state.errors.session;

  let currentUserId;
  let user;
  if (state.session.id) {
    currentUserId = state.session.id;
    user = state.entities.users[currentUserId];
  }

  const title = 'Edit account details';

  return {
    ladder,
    errors,
    currentUserId,
    title,
    user,
  };
};

const mdp = dispatch => {
  return {
    getUser: (id, ladder) => dispatch(getUser(id, ladder)),
    submitAction: (user, historyPush, ladder) => dispatch(editUser(user, historyPush, ladder)),
    clearErrors: () => dispatch(clearSessionErrors()),
  };
};

export default withRouter(connect(msp, mdp)(EditAccount));
