import React from 'react';
import field from '../general/field';
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
  
  componentDidMount() {
    this.props.clearErrors();
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid) this.props.signup(this.state);
  }

  updateField(field) {
    this.updateFormValidity();
    return e => this.setState({ [field]: e.target.value });
  }

  updateFormValidity() {
    this.formValid = true;
    if (this.state.firstName === '') this.formValid = false;
    if (this.state.lastName === '') this.formValid = false;
    if (this.state.email === '') this.formValid = false;
    if (this.state.password === '') this.formValid = false;
    if (this.state.password.length < 6) this.formValid = false;
    if (this.state.password !== this.state.reenterPassword) this.formValid = false;
  }

  render() {
    return (
      <div className='frame'>
        <h1>Register</h1>

        { this.errorSection() }

        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            <div className='name-inputs'>
              { field('firstName', 'First name', 'text', this) }
              { field('lastName', 'Last name', 'text', this) }
            </div>
            { field('email', 'Email address', 'text', this) }
            { field('password', 'Password', 'password', this) }
            { field('reenterPassword', 'Re-enter password', 'password', this) }
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
          <Link className='link' to='/login'>Login</Link>
        </>
      );
    }
  }

}

export default SignupForm;
