import React from 'react';
import { Link } from 'react-router-dom';

export default function(path, image) {
  return (
    <Link to={ path }>
      <img src={ image } className='img-button' />
    </Link>
  );
}
