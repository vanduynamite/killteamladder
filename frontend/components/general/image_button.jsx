import React from 'react';
import { Link } from 'react-router-dom';

export default (data) => {
  const path = data.path;
  const image = data.image;
  const floating = data.floating;

  let klass = 'img-button';
  if (floating) klass = 'floating-img-button';

  return (
    <Link to={ path }>
      <img src={ image } className={klass} />
    </Link>
  );
};
