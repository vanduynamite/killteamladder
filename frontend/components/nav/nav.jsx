import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import ImageButton from '../general/image_button';

const Nav = (props) => {

  return (
    <div id='bottom-nav'>
      <div id='internal-nav'>
        { ladderPic(props.history.location.pathname) }
        { navButtons(props.history.location.pathname, props.loggedIn) }
      </div>
    </div>
  );

};

const ladderPic = (fullPath) => {
  const ladder = fullPath.slice(0, fullPath.indexOf('/', 1));
  switch (ladder) {
    case '/killteam':
      return (
        <Link to='/killteam/'>
          <img src={ window.killteam_logo } id='logo' />
        </Link>
      );
    case '/underworlds':
      return (
        <Link to='/underworlds/'>
          <img src={ window.underworlds_logo } id='logo' />
        </Link>
      );
    case '':
      return (
        <Link to='/'>
          <div> </div>
        </Link>
      );
  }
};

const navButtons = (fullPath, loggedIn) => {
  console.log(fullPath);
  const ladder = fullPath.slice(0, fullPath.indexOf('/', 1));
  const path = fullPath.slice(fullPath.indexOf('/',1));
  console.log('Ladder: ' + ladder);
  console.log('Subpath: ' + path);

  if (ladder === '') {
    if (loggedIn) return <ImageButton path='/account/edit' image={ window.account } />;
    else return authButtons();
  }

  switch (path) {
    case '/login':
    case '/signup':
    case '/match/new':
    case '/account':
    case '/team/:teamId':
      return <ImageButton path={ `${ladder}/` } image={ window.close } />;

    case '/account/edit':
    case '/team/new':
      return <ImageButton path={ `${ladder}/account` } image={ window.close } />;

    case '/':
      if (loggedIn) return accountAndMatchButtons(ladder);
      else return authButtons();

      break;

    default:
      return <ImageButton path={ `${ladder}/` } image={ window.close } />;

  }
};

const accountAndMatchButtons = (ladder) => {
  return (
    <div id='nav-button-group'>
      <Link to={`${ladder}/account`}>
        <img src={ window.account } className='img-button' />
      </Link>
      <Link to={`${ladder}/match/new`}>
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

export default withRouter(connect(msp)(Nav));
