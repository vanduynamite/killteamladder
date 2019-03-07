import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ImageButton from '../general/image_button';

const Login = (props) => {

  return (
    <div id='bottom-nav'>
      <div id='internal-nav'>
        <Link to='/killteam/'>
          <img src={ window.killteam_logo } id='logo' />
        </Link>
        { navButtons(props.history.location.pathname, props.loggedIn) }
      </div>
    </div>
  );

};

const navButtons = (path, loggedIn) => {

  switch (path) {
    case '/killteam/login':
    case '/killteam/signup':
    case '/killteam/match/new':
      return <ImageButton path='/killteam/' image={ window.close } />;

    case '/killteam/account/edit':
    case '/killteam/team/new':
      return <ImageButton path='/killteam/account' image={ window.close } />;

    case '/killteam/team/:teamId/new':
      // TODO: uh fix this
      return <ImageButton path={ `/killteam/team/${teamId}` } image={ window.close } />;

    case '/killteam/':
      if (loggedIn) return accountAndMatchButtons();
      else return authButtons();

      break;

    case '/':
      if (loggedIn) return <ImageButton path='/killteam/account' image={ window.account } />;
      else return authButtons();

      break;


    default:
      return <ImageButton path='/killteam/' image={ window.close } />;

  }
};

const accountAndMatchButtons = () => {
  return (
    <div id='nav-button-group'>
      <Link to='/killteam/account'>
        <img src={ window.account } className='img-button' />
      </Link>
      <Link to='/killteam/match/new'>
        <img src={ window.add } className='img-button' />
      </Link>
      <Link to='/'>
        <img src={ window.close } className='img-button' />
      </Link>
    </div>
  );
};

const authButtons = () => {
  return (
    <div id='nav-button-group'>
      <Link className='button nav-button' to='/killteam/signup'>Register</Link>
      <Link className='button nav-button' to='/killteam/login'>Login</Link>
    </div>
  );
};



const msp = state => {
  const loggedIn = state.session.id !== undefined && state.session.id !== null;

  return {
    loggedIn,
  };
};

export default withRouter(connect(msp)(Login));
