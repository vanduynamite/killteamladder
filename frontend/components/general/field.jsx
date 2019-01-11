import React from 'react';

export default function({ fieldName, label, type='text', ctx, disabled=false }) {
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
      maxLength={ fieldName === 'email' ? 100 : 40 }
      disabled={ disabled }/>;

  return (
    <div className='single-input'>
      { inputLabel }
      { inputField }
    </div>
  );
}
