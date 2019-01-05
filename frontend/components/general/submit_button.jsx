import React from 'react';

export default function(text, active) {
  let klass = 'button ';
  klass += active ? 'submit-active' : 'submit-deactive';

  let disabled = active ? '' : 'disabled';

  return (
    <button className={ klass } disabled={ disabled }>{ text }</button>
  );
}
