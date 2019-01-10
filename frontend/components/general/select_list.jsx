import React from 'react';

export default function({fieldName, label, ctx, optionsList}) {
  const inError = Object.keys(ctx.props.errors).includes(fieldName);

  const inputLabel = (
    <label
      className={ inError ? 'error' : '' }
      htmlFor={ fieldName }>
      { label }
    </label>
  );

  const options = optionsList.map( tuple => (
    <option value={ tuple[0] } key={ tuple[0] }>{ tuple[1] }</option>
  ));

  const inputField =
      <select
        id={ fieldName }
        className={ inError ? 'error' : '' }
        onChange={ ctx.updateField(fieldName) }
        value={ ctx.state[fieldName] }>
        { options }
      </select>;

  return (
    <div className='single-input'>
      { inputLabel }
      { inputField }
    </div>
  );
}
