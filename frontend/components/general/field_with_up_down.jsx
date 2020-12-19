import React from 'react';

export default function({ fieldName, label, ctx, min, max, tooExpensive=false }) {
  const inError = Object.keys(ctx.props.errors).includes(fieldName);

  const klass = inError ? 'error' : '';

  const inputLabel = (
    <label
      className={ inError ? 'error' : '' }
      htmlFor={ fieldName }>
      { label }
    </label>
  );

  const inputField = (
    <input type='number'
      id={ fieldName }
      className={ klass }
      onChange={ ctx.updateField(fieldName) }
      value={ ctx.state[fieldName] }
      disabled={ true }/>
  );

  const minusDisabled = ctx.state[fieldName] === min;
  const minusButtonClass = minusDisabled ?
    'button submit-disabled stat-adjust-button' :
    'button submit-active stat-adjust-button';

  const plusDisabled = ctx.state[fieldName] === max || tooExpensive;
  const plusButtonClass = plusDisabled ?
    'button submit-disabled stat-adjust-button' :
    'button submit-active stat-adjust-button';

  const subtractOne = (e) => {
    e.preventDefault();
    if (minusDisabled) return;
    ctx.setState({ [fieldName]: ctx.state[fieldName] - 1});
  };

  const addOne = (e) => {
    e.preventDefault();
    if (plusDisabled) return;
    ctx.setState({ [fieldName]: ctx.state[fieldName] + 1});
  };

  return (
      <div className='single-input'>
        { inputLabel }
        <div className='field-up-down'>
        { inputField }
        <button
          className={ minusButtonClass }
          onClick={ subtractOne }
          disabled={ minusDisabled }>-</button>
        <button
          className={ plusButtonClass }
          onClick={ addOne }
          disabled={ plusDisabled }>+</button>
      </div>
    </div>
  );
}
