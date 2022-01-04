import React from 'react';
import { Link } from 'react-router-dom';
import ImageButton from './image_button';

export default (data) => {
  const path = data.path;
  const image = data.image;
  const floating = data.floating;

  let klass = 'img-button';
  if (floating) klass = 'floating-img-button';

  return (
    <div className={'fab-container'}>
      <ImageButton path={path} image={image} floating={true} />
    </div>
  );
};
