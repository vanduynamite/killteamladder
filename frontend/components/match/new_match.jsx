import React from 'react';
import Field from '../general/field';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';

class NewMatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teamId: 0,
      opponentTeamId: 0,
      result: '',
    };
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) this.props.newMatch(this.state, this.props.history.push);
  }

  updateField(field) {
    return e => this.setState({ [field]: e.target.value });
  }

  formValid() {
    if (this.state.teamId === 0) return false;
    if (this.state.opponentTeamId === 0) return false;
    if (this.state.result === '') return false;
    return true;
  }

  render() {

    return (
      <div className='frame'>
        <h1>
          Log match
        </h1>

        { this.errorSection() }

        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            <Field fieldName='teamId' label='Your team' ctx={ this }
              type='select' optionsList={ this.teamList() } />
            <Field fieldName='opponentTeamId' label="Opponent's team" ctx={ this }
              type='select' optionsList={ this.teamList() } />
            <Field fieldName='result' label='Match result' ctx={ this }
              type='select' optionsList={ this.resultList() } />
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
  resultList() {
    return [
      'I won',
      'I lost',
      'We tied',
    ];
  }

  teamList() {
    return [
      'one',
      'two',
    ]
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

export default NewMatch;
