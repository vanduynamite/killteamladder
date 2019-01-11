import React from 'react';

export default function({ fieldName, label, type='text',
  ctx, disabled=false, maxLength=20 }) {
  const inError = Object.keys(ctx.props.errors).includes(fieldName);

  let klass = inError ? 'error' : '';
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
    <div className='single-input'>
      { inputLabel }
      { inputField }
    </div>
  );
}
