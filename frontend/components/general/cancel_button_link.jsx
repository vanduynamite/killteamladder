import React from 'react';
import { Link } from 'react-router-dom';

export default function(text, path) {
  const klass = 'button cancel'
  return (
    <Link className={ klass } to={ path }>{ text }</Link>
  );
}
