import React from 'react';

export default function({ fieldName, label, type='text', ctx }) {
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
      value={ ctx.state[fieldName] }
      maxLength={ fieldName === 'email' ? 100 : 40 } />;

  return (
    <div className='single-input'>
      { inputLabel }
      { inputField }
    </div>
  );
}
