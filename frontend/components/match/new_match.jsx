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
      teamId: this.teamList()[0][0],
      opponentTeamId: this.opponentTeamList()[0][0],
      result: this.resultList()[0][0],
    };
  }

  componentDidMount() {
    this.props.getTeams();
    this.props.getUser(this.props.currentUser.id);
  }

  componentDidUpdate(oldProps) {
    const myTeams = this.teamList();

    if (this.props.cameFromTeamId && myTeams.length > 2) {
      this.setState({ teamId: this.props.cameFromTeamId });
      this.props.clearPathHistory();
    }

    if (myTeams.length >= 2 && myTeams.length <= 3 &&
      this.state.teamId !== myTeams[1][0] && !this.props.cameFromTeamId) {
      this.setState({ teamId: myTeams[1][0]});
    }

    if (this.state.teamId === 'new team') this.props.history.push('/team/new');
  }

  componentWillUnmount() {
    if (this.props.history.location.pathname === '/team/new') {
      this.props.setPathHistory({ match: true });
    }
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) this.props.newMatch(this.state, this.props.history.push);
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (this.state.teamId === this.teamList()[0][0]) return false;
    if (this.state.opponentTeamId === this.opponentTeamList()[0][0]) return false;
    if (this.state.result === this.resultList()[0][0]) return false;
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
            <SelectList fieldName='teamId' label='Your team' ctx={ this }
              optionsList={ this.teamList() } />
            <SelectList fieldName='opponentTeamId' label="Opponent's team" ctx={ this }
              optionsList={ this.opponentTeamList() } />
            <SelectList fieldName='result' label='Match result' ctx={ this }
              optionsList={ this.resultList() } />
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
  resultList() {
    return [
      ['x', 'Select a result'],
      [1, 'I won'],
      [-1, 'I lost'],
      [0, 'We tied'],
    ];
  }

  teamList() {
    const results = [['x', 'Select a team']];
    if (!this.props.currentUser.teamIds) return results;
    const teams = this.props.teams;

    this.props.currentUser.teamIds.forEach(
      id => results.push([id, teams[id].teamName]));

    results.push(['new team', 'Create a team...']);
    return results;
  }

  opponentTeamList() {
    const results = [['x', 'Select a team']];
    if (!this.props.teams || !this.props.currentUser.teamIds) return results;
    const myTeamIds = this.props.currentUser.teamIds;
    const teams = Object.values(this.props.teams);

    teams.forEach(team => {
      if (!myTeamIds.includes(team.id)) results.push([team.id, team.teamName]);
    });

    return results;
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
