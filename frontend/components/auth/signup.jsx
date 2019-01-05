import React from 'react';
import cancelButtonLink from '../general/cancel_button_link';
import submitButton from '../general/submit_button';
import { Link } from 'react-router-dom';

class SignupForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      reenterPassword: '',
    };
    this.formValid = true;
    this.updateField = this.updateField.bind(this);
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid) this.props.signup(this.state);
  }

  updateField(field) {

    return e => this.setState({ [field]: e.target.value });
  }

  render() {
    return (
      <div className='frame'>
        <h1>Register</h1>


        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            <div className='name-inputs'>
              { this.field('firstName', 'First name', false, true) }
              { this.field('lastName', 'Last name', false, true) }
            </div>
            { this.field('email', 'Email address') }
            { this.field('password', 'Password', true) }
            { this.field('reenterPassword', 'Re-enter password', true) }
          </div>

          <div className='form-buttons'>
            { cancelButtonLink('Cancel', '/') }
            { submitButton('Next', this.formValid) }
          </div>
        </form>
      </div>
    );
  }

  // subcomponents

  field(fieldName, label, password) {
    const inputLabel = (
      <label
        htmlFor={ fieldName }>
        { label }
      </label>
    );

    const inputField =
      <input type={ password ? 'password' : 'text' }
        id={ fieldName }
        onChange={ this.updateField(fieldName) }
        value={ this.state[fieldName] }></input>;

    return (
      <div className='single-input'>
        { inputLabel }
        { inputField }
      </div>
    );
  }

}

export default SignupForm;
