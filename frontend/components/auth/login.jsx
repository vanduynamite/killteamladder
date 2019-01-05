import React from 'react';
import field from '../general/field';
import cancelButtonLink from '../general/cancel_button_link';
import submitButton from '../general/submit_button';
import { Link } from 'react-router-dom';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
    this.formValid = true;
    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    this.props.clearErrors();
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid) this.props.login(this.state);
  }

  updateField(field) {
    this.updateFormValidity();
    return e => this.setState({ [field]: e.target.value });
  }

  updateFormValidity() {
    this.formValid = true;
    if (this.state.email === '') this.formValid = false;
    if (this.state.password === '') this.formValid = false;
    if (this.state.password.length < 6) this.formValid = false;
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
            { field('email', 'Email address', 'text', this) }
            { field('password', 'Password', 'password', this) }
          </div>

          <div className='form-buttons'>
            { cancelButtonLink('Cancel', '/') }
            { submitButton('Submit', this.formValid) }
          </div>
        </form>
      </div>
    );
  }

  // subcomponents

  errorSection() {
    const errors = Object.values(this.props.errors);

    if (errors.length === 0) {
      return (<></>);
    } else {
      return (
        <>
          <div id='errors'>
            { errors }
          </div>
          <Link className='link' to='/signup'>Register new account</Link>
        </>
      );
    }
  }

}

export default LoginForm;
