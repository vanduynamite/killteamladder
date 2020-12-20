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
    case '/40k':
      return (
        <Link to='/40k/'>
          <img src={ window.warhammer40k_logo } id='logo' />
        </Link>
      );
    case '/bloodbowl':
      return (
        <Link to='/bloodbowl/'>
          <img src={ window.bloodbowl_logo } id='logo' />
        </Link>
      );
    case '':
    case '/carcosa':
      return (
        <Link to='/'>
          <img src={ window.carcosa_logo } id='logo' />
        </Link>
      );
  }
};

const navButtons = (fullPath, loggedIn) => {
  const ladder = fullPath.slice(0, fullPath.indexOf('/', 1));
  const path = fullPath.slice(fullPath.indexOf('/',1));

  if (ladder === '') {
    if (!loggedIn) return authButtons(ladder);
    return;
  }

  if (path.indexOf('/team') !== -1 && path.indexOf('/edit') !== -1) {
    const startIndex = path.indexOf('/teamplayers') !== -1 ? 13 : 6;
    const teamId = path.slice(startIndex, path.length - 5);
    return <ImageButton path={ `${ladder}/team/${teamId}` } image={ window.close } />;
  }

  if (path === '/account/edit' || path === '/team/new') {
    return <ImageButton path={ `${ladder}/account` } image={ window.close } />;
  }

  if (path === '/') {
    if (loggedIn) {
      return accountAndMatchButtons(ladder);
    } else {
      return authButtons(ladder);
    }
  }

  // login, signup, match/new, account, team
  // default case, back to the ladder page
  return <ImageButton path={ `${ladder}/` } image={ window.close } />;
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

const authButtons = ladder => {
  let backLink;
  if (ladder !== '') backLink = <Link to='/'><img src={ window.close } className='img-button' /></Link>;
  return (
    <div id='nav-button-group'>
      <Link className='button nav-button' to='/carcosa/signup'>Register</Link>
      <Link className='button nav-button' to='/carcosa/login'>Login</Link>
      { backLink }
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
