import React from 'react';

export default function({ fieldName, label, ctx, disabled=false,
  extraClasses='' }) {
  const inError = Object.keys(ctx.props.errors).includes(fieldName);

  let klass = extraClasses + ' checkbox';
  if (inError) klass += ' error';
  if (disabled) klass += ' disabled';

  const inputLabel = (
    <label
      className={ inError ? 'checkbox-label error' : 'checkbox-label' }
      htmlFor={ fieldName }>
      { label }
    </label>
  );
  
  const inputField =
    <input type='checkbox'
      id={ fieldName }
      className={ klass }
      onChange={ ctx.updateField(fieldName) }
      disabled={ disabled }/>;

  return (
    <div className={`${extraClasses} checkbox-input`}>
      { inputField }
      { inputLabel }
    </div>
  );
}
