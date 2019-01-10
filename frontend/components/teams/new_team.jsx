import React from 'react';
import Field from '../general/field';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';

class NewTeam extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      faction: 'Select a faction',
      teamName: '',
    };
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) this.props.newTeam(this.state, this.props.history.push);
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  formValid() {
    if (this.state.faction === 'Select a faction') return false;
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
            <Field fieldName='faction' label='Faction' type='select'
              ctx={ this } optionsList={ this.factionList() } />
            <Field fieldName='teamName' label='Team name' ctx={ this } />
          </div>

          <div className='form-buttons'>
            <ButtonLink text='Cancel' path='/account' type='cancel' />
            <SubmitButton active={ this.formValid() } />
          </div>
        </form>
      </div>
    );
  }

  // subcomponents

  factionList() {
    return [
      'Adeptus Astartes',
      'Adeptus Mechanicus',
      'Astra Militarum',
      'Asuryani',
      'Death Guard',
      'Deathwatch',
      'Drukhari',
      'Elucidean Starstriders',
      'Gellerpox Infected',
      'Genestealer Cults',
      'Grey Knights',
      'Harlequins',
      'Heretic Astartes',
      'Necrons',
      'Orks',
      'Servants of the Abyss',
      'T\'au Empire',
      'Thousand Sons',
      'Tyranids',
    ];
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
