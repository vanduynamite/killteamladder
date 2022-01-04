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
    case '/orders':
      return(
        <Link to='/orders/'>
          <img src={ window.orders_icon } id='logo' />
        </Link>
      );
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

  switch (path) {
    case '/login':
    case '/signup':
    case '/match/new':
    case '/account':
    case '/team/:teamId':
    case '/edit':
    case '/new':
      return <ImageButton path={ `${ladder}/` } image={ window.close } />;

    case '/account/edit':
    case '/team/new':
      return <ImageButton path={ `${ladder}/account` } image={ window.close } />;

    case '/':
    case '/closed':
      if (loggedIn) return accountAndMatchButtons(ladder);
      else return authButtons(ladder);

      break;

    default:
      return <ImageButton path={ `${ladder}/` } image={ window.close } />;

  }
};

const accountAndMatchButtons = (ladder) => {
  const newLink =
    <Link to={ladder !== '/orders' ? `${ladder}/match/new` : '/orders/new'}>
      <img src={ window.add } className='img-button' />
    </Link>;

  return (
    <div id='nav-button-group'>
      <Link to={`${ladder}/account`}>
        <img src={ window.account } className='img-button' />
      </Link>
      {newLink}
      <Link to='/'>
        <img src={ window.close } className='img-button' />
      </Link>
    </div>
  );
};

const authButtons = (ladder) => {
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
