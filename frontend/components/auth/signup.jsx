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
    if (this.formValid()) this.props.submitAction(this.state);
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  formValid() {
    if (this.state.firstName === '') return false;
    if (this.state.lastName === '') return false;
    if (this.state.email === '') return false;
    if (this.state.password === '') return false;
    if (this.state.password.length < 6) return false;
    if (this.state.password !== this.state.reenterPassword) return false;
    return true;
  }

  render() {
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
            <Field fieldName='email' label='Email address' ctx={ this } />
            <Field fieldName='password' label='Password' type='password' ctx={ this } />
            <Field fieldName='reenterPassword' label='Re-enter password' type='password' ctx={ this } />
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

    if (errors.length === 0) {
      return;
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
