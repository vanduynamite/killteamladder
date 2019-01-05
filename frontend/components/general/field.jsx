import React from 'react';

export default function(fieldName, label, type, ctx) {
  const inError = Object.keys(ctx.props.errors).includes(fieldName);

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
      className={ inError ? 'error' : '' }
      onChange={ ctx.updateField(fieldName) }
      value={ ctx.state[fieldName] }></input>;

  return (
    <div className='single-input'>
      { inputLabel }
      { inputField }
    </div>
  );
}
