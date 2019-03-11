import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const Background = props => {
  const fullPath = props.history.location.pathname;
  const ladder = fullPath.slice(0, fullPath.indexOf('/', 1));

  let backgroundPath = window.killteam_background;
  if (ladder === '/underworlds') backgroundPath = window.underworlds_background;

  return (
    <div id='background'>
      <img src={ backgroundPath } />
      <img id='texture' src={ window.texture } />
    </div>
  );
};

export default withRouter(connect()(Background));
