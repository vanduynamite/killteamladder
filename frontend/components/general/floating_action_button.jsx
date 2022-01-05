import React from 'react';

export default (data) => {
  const action = data.action;
  const image = data.image;

  const klass = 'floating-img-button';

  return (
    <div className={'fab-container'} onClick={action}>
      <img src={ image } className={klass} />
    </div>
  );
};
