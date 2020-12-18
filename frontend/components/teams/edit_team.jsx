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
    if (this.formValid()) this.props.editTeam(this.state, this.props.history.push);
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (!this.props.team) return false;
    if (this.state.teamName === this.props.team.teamName &&
        this.state.cheerleaders === this.props.team.cheerleaders &&
        this.state.apothecaries === this.props.team.apothecaries &&
        this.state.rerolls === this.props.team.rerolls &&
        this.state.assistantCoaches === this.props.team.assistantCoaches &&
        this.state.dedicatedFans === this.props.team.dedicatedFans) return false;
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
    const minRerolls = Math.max(0, this.state.rerollsOriginal);

    // if (this.props.teams.stats.matchesPlayed === 0) {
      const dedicatedFans = (
        <UpDownField fieldName='dedicatedFans' label='Dedicated Fans'
          min={1} max={6} ctx={ this } />
      );
    //   const rerollCost = 2 * rerollCost;
    // }
    return (
      <div>
        <UpDownField fieldName='rerolls' label='Rerolls'
          min={ minRerolls } max={8} ctx={ this } />
        <UpDownField fieldName='assistantCoaches' label='Assistant Coaches'
          min={0} max={6} ctx={ this } />
        <UpDownField fieldName='apothecaries' label='Apothecary'
          min={0} max={1} ctx={ this } />
        <UpDownField fieldName='cheerleaders' label='Cheerleaders'
          min={0} max={12} ctx={ this } />
        { dedicatedFans }
      </div>
    );
    // TODO: put in estimated treasury change

  }

}

export default EditTeam;
