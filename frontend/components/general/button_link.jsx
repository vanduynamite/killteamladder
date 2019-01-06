import React from 'react';
import { Link } from 'react-router-dom';

export default function(text, path, type) {
  const klass = `button ${type}`
  return (
    <Link className={ klass } to={ path }>{ text }</Link>
  );
}
