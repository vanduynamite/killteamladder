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
    this.formValid = false;
  }

  submit(e) {
    e.preventDefault();
    console.log(this.state);
    // if (this.formValid) this.props.login(this.state);
    // history.push('/');
  }

  updateField(field) {
    this.updateFormValidity();
    return e => this.setState({ [field]: e.target.value });
  }

  updateFormValidity() {
    this.formValid = true;
    if (this.state.faction === 'Select a faction') this.formValid = false;
    if (this.state.teamName === '') this.formValid = false;
  }

  render() {
    const greeting = this.props.loggedIn ?
      ` ${this.props.currentUser.firstName}` :
      '';

    return (
      <div className='frame'>
        <h1>
          Create team
        </h1>
        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            { Field('faction', 'Faction', 'select', this, this.factionList()) }
            { Field('teamName', 'Team name', 'text', this) }
          </div>

          <div className='form-buttons'>
            { ButtonLink('Cancel', '/account', 'cancel') }
            { SubmitButton('Submit', this.formValid) }
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

}

export default NewTeam;
