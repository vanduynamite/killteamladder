import React from 'react';

export default function(fieldName, label, type, ctx, optionsList) {
  const inError = Object.keys(ctx.props.errors).includes(fieldName);

  const inputLabel = (
    <label
      className={ inError ? 'error' : '' }
      htmlFor={ fieldName }>
      { label }
    </label>
  );

  let inputField;

  if (type === 'select') {
    const options = optionsList.map( text => (
      <option value={ text } key={ text }>{ text }</option>
    ));

    inputField =
      <select
        id={ fieldName }
        className={ inError ? 'error' : '' }
        onChange={ ctx.updateField(fieldName) }
        value={ ctx.state[fieldName] }>
        <option value='Select a faction'>Select a faction</option>
        { options }
      </select>;

  } else {
    inputField =
    <input type={ type }
      id={ fieldName }
      className={ inError ? 'error' : '' }
      onChange={ ctx.updateField(fieldName) }
      value={ ctx.state[fieldName] }
      maxLength={ fieldName === 'email' ? 100 : 20 } />;

  }

  return (
    <div className='single-input'>
      { inputLabel }
      { inputField }
    </div>
  );
}
