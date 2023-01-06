import React from 'react';

export default (data) => {
  const action = data.action;
  const additionalClasses = data.className;
  const image = data.image;

  let klass = 'img-button ';
  if (additionalClasses) klass += additionalClasses;

  return (
    <div className={'img-action-button-container'} onClick={action}>
      <img src={ image } className={klass} />
    </div>
  );
};
