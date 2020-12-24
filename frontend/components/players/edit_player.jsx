import React from 'react';
import { Link } from 'react-router-dom';
import Field from '../general/field';
import SelectList from '../general/select_list';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import UpDownField from '../general/field_with_up_down';

class EditPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      teamId: this.props.teamId,
      teamName: this.props.team ? this.props.team.teamName : '',
    };
  }

  componentDidMount() {
    // if (!this.props.team) this.props.getTeam(this.props.teamId);
  }

  componentDidUpdate(prevProps) {
    // if (this.props.currentUserId !== this.props.ownerId) {
    //   this.props.history.push(`${this.props.ladder}/team/${this.props.team.id}`);
    // }
    //
    // if (!prevProps.team && this.props.team) {
    //   this.setState({ teamName: this.props.team.teamName });
    //
    //   if (this.props.team.bbStats) {
    //     const bbStats = this.props.team.bbStats;
    //     this.setState({ cheerleaders: bbStats.cheerleaders });
    //     this.setState({ apothecaries: bbStats.apothecaries });
    //     this.setState({ rerolls: bbStats.rerolls });
    //     this.setState({ assistantCoaches: bbStats.assistantCoaches });
    //     this.setState({ dedicatedFans: bbStats.dedicatedFans });
    //     this.setState({ treasury: bbStats.treasury });
    //
    //     this.setState({ rerollsOriginal: bbStats.rerolls });
    //   }
    // }

  }

  submit(e) {
    e.preventDefault();
    // if (this.formValid()) {
    //   const data = this.state;
    //   if (this.props.ladder === '/bloodbowl') {
    //     data.treasury = this.calculateTreasury();
    //   }
    //   this.props.editTeam(data, this.props.history.push);
    // }
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    // if (!this.props.team) return false;
    //
    // if (this.props.ladder === '/bloodbowl') {
    //   if (this.state.cheerleaders === this.props.team.bbStats.cheerleaders &&
    //       this.state.apothecaries === this.props.team.bbStats.apothecaries &&
    //       this.state.rerolls === this.props.team.bbStats.rerolls &&
    //       this.state.assistantCoaches === this.props.team.bbStats.assistantCoaches &&
    //       this.state.dedicatedFans === this.props.team.bbStats.dedicatedFans) {
    //     return false;
    //   }
    //   if (this.calculateTreasury() < 0) {
    //     return false;
    //   }
    // } else if (this.state.teamName === this.props.team.teamName) {
    //   return false;
    // }

    return true;
  }

  render() {

    if (!this.props.team) return <></>;

    return (
      <div className='frame'>
        <h1>
          Edit player
        </h1>

        { this.errorSection() }

      </div>
    );
    // <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
    //   <input autoComplete='false' name='hidden'
    //     type='text' style={{ display:'none' }} />
    //
    //   <div className='inputs'>
    //     <Field fieldName='teamName' label='Team name'
    //       maxLength='40' ctx={ this } />
    //       { this.bbFields() }
    //   </div>
    //
    //   <div className='form-buttons'>
    //     <ButtonLink text='Cancel' type='cancel'
    //       path={ `${this.props.ladder}/team/${this.props.team.id}` } />
    //     <SubmitButton text='Save changes' active={ this.formValid() } />
    //   </div>
    //   <Link className='retire-link' to={ `${this.props.ladder}/team/${this.props.team.id}/retire` } >
    //     Retire team</Link>
    // </form>
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

}

export default EditPlayer;
