import React from 'react';
import { Link } from 'react-router-dom';
import Field from '../general/field';
import SelectList from '../general/select_list';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import UpDownField from '../general/field_with_up_down';

class EditTeam extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      id: this.props.teamId,
      teamName: this.props.team ? this.props.team.teamName : '',
      cheerleaders: this.props.team && this.props.team.bbStats ?
        this.props.team.bbStats.cheerleaders :
        '',
      apothecaries: this.props.team && this.props.team.bbStats ?
        this.props.team.bbStats.apothecaries :
        '',
      rerolls: this.props.team && this.props.team.bbStats ?
        this.props.team.bbStats.rerolls :
        '',
      assistantCoaches: this.props.team && this.props.team.bbStats ?
        this.props.team.bbStats.assistantCoaches :
        '',
      dedicatedFans: this.props.team && this.props.team.bbStats ?
        this.props.team.bbStats.dedicatedFans :
        '',
      treasury: this.props.team && this.props.team.bbStats ?
        this.props.team.bbStats.treasury :
        '',
      rerollsOriginal: this.props.team && this.props.team.bbStats ?
        this.props.team.bbStats.rerolls :
        '',
    };
  }

  componentDidMount() {
    if (!this.props.team) this.props.getTeam(this.props.teamId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUserId !== this.props.ownerId) {
      this.props.history.push(`${this.props.ladder}/team/${this.props.team.id}`);
    }

    if (!prevProps.team && this.props.team) {
      this.setState({ teamName: this.props.team.teamName });

      if (this.props.team.bbStats) {
        const bbStats = this.props.team.bbStats;
        this.setState({ cheerleaders: bbStats.cheerleaders });
        this.setState({ apothecaries: bbStats.apothecaries });
        this.setState({ rerolls: bbStats.rerolls });
        this.setState({ assistantCoaches: bbStats.assistantCoaches });
        this.setState({ dedicatedFans: bbStats.dedicatedFans });
        this.setState({ treasury: bbStats.treasury });

        this.setState({ rerollsOriginal: bbStats.rerolls });
      }
    }

  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) {
      const data = this.state;
      if (this.props.ladder === '/bloodbowl') {
        data.treasury = this.calculateTreasury();
      }
      this.props.editTeam(data, this.props.history.push);
    }
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (!this.props.team) return false;
    debugger;
    if (this.props.ladder === '/bloodbowl') {
      if (this.state.cheerleaders === this.props.team.bbStats.cheerleaders &&
          this.state.apothecaries === this.props.team.bbStats.apothecaries &&
          this.state.rerolls === this.props.team.bbStats.rerolls &&
          this.state.assistantCoaches === this.props.team.bbStats.assistantCoaches &&
          this.state.dedicatedFans === this.props.team.bbStats.dedicatedFans) {
        return false;
      }
      if (this.calculateTreasury() < 0) {
        return false;
      }
    } else if (this.state.teamName === this.props.team.teamName) {
      return false;
    }

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
            <Field fieldName='teamName' label='Team name'
              maxLength='40' ctx={ this } />
              { this.bbFields() }
          </div>

          <div className='form-buttons'>
            <ButtonLink text='Cancel' type='cancel'
              path={ `${this.props.ladder}/team/${this.props.team.id}` } />
            <SubmitButton text='Save changes' active={ this.formValid() } />
          </div>
          <Link className='retire-link' to={ `${this.props.ladder}/team/${this.props.team.id}/retire` } >
            Retire team</Link>
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

  bbFields() {
    if (this.props.ladder !== '/bloodbowl') return;
    if (!this.props.team || !this.props.team.bbStats) return;

    const treasury = this.calculateTreasury();

    const minRerolls = Math.max(0, this.state.rerollsOriginal);
    let rerolls = (
      <UpDownField fieldName='rerolls' label='Rerolls'
        min={ minRerolls } max={8} ctx={ this }
        tooExpensive={ this.rerollCost() > treasury } />
    );
    let dedicatedFans = (<></>);
    let apothecaries = (<></>);
    if (this.props.team.stats.matchesPlayed === 0) {
      dedicatedFans = (
        <UpDownField fieldName='dedicatedFans' label='Dedicated Fans'
          min={1} max={6} ctx={ this } tooExpensive={ 10000 > treasury }/>
      );
      rerolls = (
        <UpDownField fieldName='rerolls' label='Rerolls'
          min={0} max={8} ctx={ this }
          tooExpensive={ this.rerollCost() > treasury } />
      );
    }

    if (this.props.team.bbStats.canHaveApothecary) {
      apothecaries = (
        <UpDownField fieldName='apothecaries' label='Apothecary'
          min={0} max={1} ctx={ this } tooExpensive={ 50000 > treasury }/>
      );
    }

    return (
      <div>
        { rerolls }
        { apothecaries }
        <UpDownField fieldName='assistantCoaches' label='Assistant Coaches'
          min={0} max={6} ctx={ this } tooExpensive={ 10000 > treasury }/>
        <UpDownField fieldName='cheerleaders' label='Cheerleaders'
          min={0} max={12} ctx={ this } tooExpensive={ 10000 > treasury }/>
        { dedicatedFans }
        { this.treasury(treasury) }
      </div>
    );

  }

  treasury(treasury) {
    if (this.props.ladder !== '/bloodbowl') return;
    if (!this.props.team || !this.props.team.bbStats) return;

    return (
      <div className='single-input'>
        <label
          className={ treasury < 0 ? 'error' : ''}
          htmlFor='treasury'>
          Treasury
        </label>
        <input type='number'
          id='treasury'
          className={ treasury < 0 ? 'error disabled' : 'disabled' }
          value={ treasury }
          disabled={ true }/>
      </div>
    );
  }

  rerollCost() {
    if (!this.props.team.stats || !this.props.team.bbStats) return;

    if (this.props.team.stats.matchesPlayed === 0) {
      return this.props.team.bbStats.rerollCost;
    } else {
      return 2 * this.props.team.bbStats.rerollCost;
    }
  }

  calculateTreasury() {
    if (this.props.ladder !== '/bloodbowl') return;
    if (!this.props.team || !this.props.team.bbStats) return;

    const freshTeam = this.props.team.stats.matchesPlayed === 0;
    let treasury = this.state.treasury * 1;

    const vals = [];
    vals.push({
      diff: this.state.cheerleaders - this.props.team.bbStats.cheerleaders,
      cost: 10000,
      name: 'cheerleaders'});
    vals.push({
      diff: this.state.apothecaries - this.props.team.bbStats.apothecaries,
      cost: 50000,
      name: 'apothecaries'});
    vals.push({
      diff: this.state.rerolls - this.props.team.bbStats.rerolls,
      cost: this.rerollCost(),
      name: 'rerolls'});
    vals.push({
      diff: this.state.assistantCoaches - this.props.team.bbStats.assistantCoaches,
      cost: 10000,
      name: 'assistantCoaches'});
    vals.push({
      diff: this.state.dedicatedFans - this.props.team.bbStats.dedicatedFans,
      cost: 10000,
      name: 'dedicatedFans'});

    vals.forEach(({diff, cost, name}) => {
      if (diff > 0 || (diff < 0 && freshTeam)) {
        treasury -= cost * diff;
      }
    });

    return treasury;
  }

}

export default EditTeam;
