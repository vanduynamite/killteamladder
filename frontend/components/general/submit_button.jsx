import React from 'react';

export default function(text, active) {
  let klass = 'button ';
  klass += active ? 'submit-active' : 'submit-deactive';

  return (
    <button className={ klass }>{ text }</button>
  );
}
