import React from 'react';

export default ({ name, stat, grey=false }) => {
  let klass = 'stat-container';
  if (grey) klass += ' grey';

  return (
    <div className={ klass }>
      <div>{ name }</div>
      <div>{ stat }</div>
    </div>
  );
};
