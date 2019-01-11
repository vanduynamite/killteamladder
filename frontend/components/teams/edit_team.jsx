import React from 'react';
import { Link } from 'react-router-dom';
import Field from '../general/field';
import SelectList from '../general/select_list';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';

class EditTeam extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.teamId,
      teamName: this.props.team ? this.props.team.teamName : '',
    };
  }

  componentDidMount() {
    if (!this.props.team) this.props.getTeam(this.props.teamId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUserId !== this.props.ownerId) {
      this.props.history.push(`/team/${this.props.team.id}`);
    }
    
    if (!prevProps.team && this.props.team) {
      this.setState({ teamName: this.props.team.teamName });
    }
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) this.props.editTeam(this.state, this.props.history.push);
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (!this.props.team) return false;
    if (this.state.teamName === this.props.team.teamName) return false;
    return true;
  }

  render() {

    if (!this.props.team) return <></>;

    return (
      <div className='frame'>
        <h1>
          Edit team
        </h1>

        { this.errorSection() }

        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            <Field fieldName='teamName' label='Team name' ctx={ this } />
          </div>

          <div className='form-buttons'>
            <ButtonLink text='Cancel' type='cancel'
              path={ `/team/${this.props.team.id}` } />
            <SubmitButton text='Save changes' active={ this.formValid() } />
          </div>
          <Link className='retire-link' to={ `/team/${this.props.team.id}/retire` } >
            Retire team (doesn't work yet)</Link>
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
          <div id='errors'>
            { errors }
          </div>
      );
    }
  }

}

export default EditTeam;
