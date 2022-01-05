import React from 'react';

export default (data) => {
  const action = data.action;
  const image = data.image;

  return (
    <div className={'img-action-button-container'} onClick={action}>
      <img src={ image } className={'img-button'} />
    </div>
  );
};
