import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { clearSessionErrors } from '../../actions/session_actions';
import {
  getUser,
  editUser
 } from '../../actions/user_actions';
import EditAccount from '../auth/signup';

const msp = state => {
  const errors = state.errors.session;

  let currentUserId;
  let user;
  if (state.session.id) {
    currentUserId = state.session.id;
    user = state.entities.users[currentUserId];
  }

  const title = 'Edit account details';

  return {
    errors,
    currentUserId,
    title,
    user,
  };
};

const mdp = dispatch => {
  return {
    getUser: id => dispatch(getUser(id)),
    submitAction: (user, historyPush) => dispatch(editUser(user, historyPush)),
    clearErrors: () => dispatch(clearSessionErrors()),
  };
};

export default withRouter(connect(msp, mdp)(EditAccount));
