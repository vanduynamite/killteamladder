import React from 'react';

export default (data) => {
  const action = data.action;
  const additionalClasses = data.className;
  const text = data.text;

  const className = 'button text-action-button ' + additionalClasses;

  return (
    <div className={className} onClick={action}>
      {text}
    </div>
  );
};
