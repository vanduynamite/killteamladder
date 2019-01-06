import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';

const Login = (props) => {

  return (
    <div id='bottom-nav'>
      <img src={ window.logo } id='logo' />
      { navButtons(props.history.location.pathname, props.loggedIn) }
    </div>
  );

};

const navButtons = (path, loggedIn) => {

  switch (path) {
    case '/login':
    case '/signup':
      return (
        <Link to='/'>
          <img src={ window.close } className='img-button' />
        </Link>
      );

    case '/':
      if (loggedIn) {
        return accountAndMatchButtons();
      } else {
        return authButtons();
      }
      break;

    default:
      return (
        <Link to='/'>
          <img src={ window.close } className='img-button' />
        </Link>
      );
  }
};

const accountAndMatchButtons = () => {
  return (
    <div id='nav-button-group'>
      <Link to='/account'>
        <img src={ window.account } className='img-button' />
      </Link>
      <Link to='/match'>
        <img src={ window.add } className='img-button' />
      </Link>
    </div>
  );
};

const authButtons = () => {
  return (
    <div id='nav-button-group'>
      <Link className='button nav-button' to='/signup'>Register</Link>
      <Link className='button nav-button' to='/login'>Login</Link>
    </div>
  );
};



const msp = state => {
  const loggedIn = state.session.id !== undefined;

  return {
    loggedIn,
  };
};

export default withRouter(connect(msp)(Login));
