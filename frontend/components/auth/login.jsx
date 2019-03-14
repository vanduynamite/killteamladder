import React from 'react';
import Field from '../general/field';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) this.props.login(this.state);
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  formValid() {
    if (this.state.email === '') return false;
    if (this.state.password === '') return false;
    if (this.state.password.length < 6) return false;
    return true;
  }

  render() {
    return (
      <div className='frame'>
        <h1>Login</h1>

        { this.errorSection() }

        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            <Field fieldName='email' label='Email address'
              maxLength='100' ctx={ this } />
            <Field fieldName='password' label='Password'
              type='password' ctx={ this } />
          </div>

          <div className='form-buttons'>
            <ButtonLink text='Cancel' path='/' type='cancel' />
            <SubmitButton active={ this.formValid() } />
          </div>
        </form>
      </div>
    );
  }

  // subcomponents

  errorSection() {
    const errors = Object.values(this.props.errors);

    if (errors.length === 0) {
      return;
    } else {
      return (
        <>
          <div id='errors'>
            { errors }
          </div>
          <Link className='link' to='/killteam/signup'>Register new account</Link>
        </>
      );
    }
  }

}

export default LoginForm;
