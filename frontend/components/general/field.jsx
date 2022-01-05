import React from 'react';

export default function({ fieldName, label, type='text',
  ctx, disabled=false, maxLength=20, extraClasses='' }) {
  const inError = Object.keys(ctx.props.errors).includes(fieldName);

  let klass = extraClasses;
  if (inError) klass += ' error';
  if (disabled) klass += ' disabled';

  const inputLabel = (
    <label
      className={ inError ? 'error' : '' }
      htmlFor={ fieldName }>
      { label }
    </label>
  );

  const inputField =
    <input type={ type }
      id={ fieldName }
      className={ klass }
      onChange={ ctx.updateField(fieldName) }
      value={ ctx.state[fieldName] }
      maxLength={ maxLength }
      disabled={ disabled }/>;

  return (
    <div className={`${extraClasses} single-input`}>
      { inputLabel }
      { inputField }
    </div>
  );
}
