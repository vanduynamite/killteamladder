import React from 'react';
import Field from '../general/field';
import SelectList from '../general/select_list';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';

class NewTeam extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
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
            <ButtonLink text='Cancel' path='/killteam/account' type='cancel' />
            <SubmitButton active={ this.formValid() } />
          </div>
        </form>
      </div>
    );
  }

  // subcomponents

  factionList() {
    return [
      ['x', 'Select a faction'],
      ['Adeptus Astartes', 'Adeptus Astartes'],
      ['Adeptus Mechanicus', 'Adeptus Mechanicus'],
      ['Astra Militarum', 'Astra Militarum'],
      ['Asuryani', 'Asuryani'],
      ['Death Guard', 'Death Guard'],
      ['Deathwatch', 'Deathwatch'],
      ['Drukhari', 'Drukhari'],
      ['Elucidean Starstriders', 'Elucidean Starstriders'],
      ['Gellerpox Infected', 'Gellerpox Infected'],
      ['Genestealer Cults', 'Genestealer Cults'],
      ['Grey Knights', 'Grey Knights'],
      ['Harlequins', 'Harlequins'],
      ['Heretic Astartes', 'Heretic Astartes'],
      ['Kroot', 'Kroot'],
      ['Necrons', 'Necrons'],
      ['Orks', 'Orks'],
      ['Servants of the Abyss', 'Servants of the Abyss'],
      ['T\'au Empire', 'T\'au Empire'],
      ['Thousand Sons', 'Thousand Sons'],
      ['Tyranids', 'Tyranids'],
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
