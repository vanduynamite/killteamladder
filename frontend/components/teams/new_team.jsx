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
    const result = [['x', 'Select a faction']];
    switch (this.props.ladder) {
      case '/killteam':
        return result.concat([
          ['Adeptus Astartes', 'Adeptus Astartes'],
          ['Adeptus Custodes', 'Adeptus Custodes'],
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
        ]);

      case '/40k':
        return result.concat([
          ['Adeptus Astartes', 'Adeptus Astartes'],
          ['Adeptus Custodes', 'Adeptus Custodes'],
          ['Adeptus Mechanicus', 'Adeptus Mechanicus'],
          ['Adepta Sororitas', 'Adepta Sororitas'],
          ['Aeldari', 'Aeldari'],
          ['Astra Militarum', 'Astra Militarum'],
          ['Asuryani', 'Asuryani'],
          ['Blood Angels', 'Blood Angels'],
          ['Chaos', 'Chaos'],
          ['Chaos Knights', 'Chaos Knights'],
          ['Dark Angels', 'Dark Angels'],
          ['Dark Mechanicus', 'Dark Mechanicus'],
          ['Death Guard', 'Death Guard'],
          ['Deathwatch', 'Deathwatch'],
          ['Demons', 'Demons'],
          ['Drukhari', 'Drukhari'],
          ['Elucidean Starstriders', 'Elucidean Starstriders'],
          ['Fallen', 'Fallen'],
          ['Gellerpox Infected', 'Gellerpox Infected'],
          ['Genestealer Cults', 'Genestealer Cults'],
          ['Grey Knights', 'Grey Knights'],
          ['Harlequins', 'Harlequins'],
          ['Heretic Astartes', 'Heretic Astartes'],
          ['Imperial Knights', 'Imperial Knights'],
          ['Imperium', 'Imperium'],
          ['Necrons', 'Necrons'],
          ['Orks', 'Orks'],
          ['Servants of the Abyss', 'Servants of the Abyss'],
          ['Space Wolves', 'Space Wolves'],
          ['T\'au Empire', 'T\'au Empire'],
          ['Thousand Sons', 'Thousand Sons'],
          ['Tyranids', 'Tyranids'],
        ]);


      case '/underworlds':
        return result.concat([
          ["Garrek's Reavers","Garrek's Reavers"],
          ["Steelheart's Champions","Steelheart's Champions"],
          ["Sepulchral Guard","Sepulchral Guard"],
          ["Ironskull's Boyz","Ironskull's Boyz"],
          ["The Chosen Axes","The Chosen Axes"],
          ["Spiteclaw's Swarm","Spiteclaw's Swarm"],
          ["The Farstriders","The Farstriders"],
          ["Magore's Fiends","Magore's Fiends"],
          ["Stormsire's Cursebreakers","Stormsire's Cursebreakers"],
          ["Thorns of the Brian Queen","Thorns of the Brian Queen"],
          ["Eyes of the Nine","Eyes of the Nine"],
          ["Zarbag's Gitz","Zarbag's Gitz"],
          ["Mollog's Mob","Mollog's Mob"],
          ["Godsworn Hunt","Godsworn Hunt"],
          ["Thundrik's Profiteers","Thundrik's Profiteers"],
          ["Ylthari's Guardians","Ylthari's Guardians"],
        ]);
    }

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
