import React from 'react';
import { Link } from 'react-router-dom';
import Field from '../general/field';
import SelectList from '../general/select_list';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';

class NewMatch extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.matchId,
      teamName: '',
      opponentTeamName: '',
      result: this.resultList()[0][0],
    };
  }

  componentDidMount() {
    this.props.getMatch(this.props.matchId);
  }

  componentDidUpdate(oldProps) {

    let match;
    if (this.props.currentMatch) {
      match = this.props.currentMatch;
      const team = this.props.teams[match.teamId];
      if (this.props.currentUserId !== team.userId) {
        this.props.history.push(`${this.props.ladder}/match/${match.opposingMatchId}/edit`);
      }
    }

    if (oldProps.currentMatch !== match) {
      this.setState({
        result: match.result,
        teamName: this.props.teams[match.teamId].teamName,
        opponentTeamName: this.props.teams[match.opposingTeamId].teamName,
      });
    }
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) this.props.submitAction(this.state, this.props.history.push);
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (this.state.result === this.resultList()[0][0]) return false;
    return true;
  }

  render() {

    return (
      <div className='frame'>
        <h1>
          { this.title() }
        </h1>

        { this.errorSection() }

        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            <Field fieldName='teamName' label='Your team'
              maxLength='40' ctx={ this } disabled={ true } />
            <Field fieldName='opponentTeamName' label="Opponent's team"
              maxLength='40' ctx={ this } disabled={ true } />
            { this.matchResultsDropdown() }
          </div>

          <div className='form-buttons'>
            <ButtonLink text='Cancel' type='cancel'
              path={ this.props.deleteForm ? `${this.props.ladder}/match/${this.props.matchId}/edit` : `${this.props.ladder}/` } />
            <SubmitButton active={ this.formValid() }
              text={ this.props.deleteForm ? 'Delete' : 'Submit' }/>
          </div>

          { this.deleteLink() }

        </form>
      </div>
    );
  }

  // subcomponents
  title() {
    return this.props.deleteForm ?
      'Delete match' :
      'Edit match';
  }

  deleteLink() {
    if (!this.props.deleteForm) {
      return <Link className='retire-link' to={ `${this.props.ladder}/match/${this.props.matchId}/delete` } >
        Delete match</Link>;
    }
  }

  resultList() {
    return [
      ['x', 'Select a result'],
      [1, 'I won'],
      [-1, 'I lost'],
      [0, 'We tied'],
    ];
  }

  matchResultsDropdown() {
    if (!this.props.deleteForm) {
      return <SelectList fieldName='result' label='Match result' ctx={ this }
        optionsList={ this.resultList() } />;
    }

  }

  errorSection() {
    let errors = Object.values(this.props.errors);

    if (this.props.deleteForm && errors.length === 0) {
      errors = ['Are you sure you want to delete this match?'];
    }

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
