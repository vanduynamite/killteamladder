import React from 'react';
import Field from '../general/field';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
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

    this.updateField = this.updateField.bind(this);
  }

  componentDidMount() {
    if (this.props.currentUserId && !this.props.user) {
      this.props.getUser(this.props.currentUserId);
    }

    if (this.props.user) {
      this.setState({ firstName: this.props.user.firstName });
      this.setState({ lastName: this.props.user.lastName });
      this.setState({ email: this.props.user.email });
      this.setState({ id: this.props.user.id });
    }
    this.props.clearErrors();
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      this.setState({ firstName: this.props.user.firstName });
      this.setState({ lastName: this.props.user.lastName });
      this.setState({ email: this.props.user.email });
      this.setState({ id: this.props.user.id });
    }
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) {
      this.props.submitAction(Object.assign({}, this.state), this.props.history.push)
    };
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  formValid() {
    if (this.state.firstName === '') return false;
    if (this.state.lastName === '') return false;
    if (this.state.email === '') return false;
    if (this.state.password !== this.state.reenterPassword) return false;

    // this is a dual purpose form, so password can be blank
    // if we are editing the user but don't want to change the password
    if (this.state.password === '' && !this.props.user) return false;
    if (this.state.password.length < 6 && this.state.password !== '') return false;
    return true;
  }

  render() {
    const path = this.props.user ? '/account' : '/';

    const passwordLabel = this.props.user ? 'New password (optional)' : 'Password';
    const rePasswordLabel = this.props.user ? 'Re-enter new password' : 'Re-enter password';

    return (
      <div className='frame'>
        <h1>{ this.props.title }</h1>

        { this.errorSection() }

        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            <div className='name-inputs'>
              <Field fieldName='firstName' label='First name' ctx={ this } />
              <Field fieldName='lastName' label='Last name' ctx={ this } />
            </div>
            <Field fieldName='email' label='Email address'
              maxLength='100' ctx={ this } />
            <Field fieldName='password' label={ passwordLabel }
              type='password' ctx={ this } />
            <Field fieldName='reenterPassword' label={ rePasswordLabel }
              type='password' ctx={ this } />
          </div>

          <div className='form-buttons'>
            <ButtonLink text='Cancel' path={ path } type='cancel' />
            <SubmitButton active={ this.formValid() } />
          </div>
        </form>
      </div>
    );
  }

  // subcomponents

  field(fieldName, label, password) {
    const inputLabel = (
      <label
        htmlFor={ FieldName }>
        { label }
      </label>
    );

    const inputField =
      <input type={ password ? 'password' : 'text' }
        id={ FieldName }
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
    const errors = Object.values(this.props.errors).map(error =>
      <div key={ error }>{ error }</div>);

    let loginLink;
    if (!this.props.user) loginLink = <Link className='link' to='/login'>Login</Link>;

    if (errors.length === 0) {
      return;
    } else {
      return (
        <>
          <div id='errors'>
            { errors }
          </div>
          { loginLink }
        </>
      );
    }
  }

}

export default SignupForm;
