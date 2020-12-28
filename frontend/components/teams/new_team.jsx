import React from 'react';
import Field from '../general/field';
import SelectList from '../general/select_list';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';

class NewTeam extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ladderName: this.props.ladder,
      faction: this.factionList()[0][0],
      teamName: '',
    };
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) this.props.newTeam(this.state, this.props.history.push);
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (this.state.faction === this.factionList()[0][0]) return false;
    if (this.state.teamName === '') return false;
    return true;
  }

  render() {
    return (
      <div className='frame'>
        <h1>
          Create team
        </h1>

        { this.errorSection() }

        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            <SelectList fieldName='faction' label='Faction' ctx={ this }
              optionsList={ this.factionList() } />
            <Field fieldName='teamName' label='Team name'
              maxLength='40' ctx={ this } />
          </div>

          <div className='form-buttons'>
            <ButtonLink text='Cancel' path={ `${this.props.ladder}/account` } type='cancel' />
            <SubmitButton active={ this.formValid() } />
          </div>
        </form>
      </div>
    );
  }

  // subcomponents

  factionList() {
    const factions = Object.values(this.props.factions);
    const result = [];
    factions.forEach(faction => {
      if (faction.ladder === this.props.ladder) {
        result.push([faction.id, faction.factionName]);
      }
    });
    result.sort((a, b) => a[1] <= b[1] ? -1 : 1);
    result.unshift(['x', 'Select a faction']);
    return result;
  }

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

export default NewTeam;
