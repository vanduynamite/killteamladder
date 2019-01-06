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
        return authButtons();
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


const authButtons = () => {
  return (
    <div id='auth-buttons'>
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
