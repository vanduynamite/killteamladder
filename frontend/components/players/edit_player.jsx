import React from 'react';
import { Link } from 'react-router-dom';
import Field from '../general/field';
import SelectList from '../general/select_list';
import PlayerListItem from './player_list_item';
import TemplateListItem from './template_list_item';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import UpDownField from '../general/field_with_up_down';

class EditPlayer extends React.Component {

  constructor(props) {
    super(props);
    this.checkForTreasuryError();
    this.state = {
      teamId: this.props.teamId,
      templateId: this.props.templateId,
      playerId: this.props.playerId,
      name: this.props.player ? this.props.player.name : '',
      number: this.props.player ? this.props.player.number : '',
      treasury: this.props.team ? this.props.team.treasury : 0,
      playerNumbers: this.playerNumbers(),
    };
  }

  componentDidMount() {
    if (!this.props.template && !this.props.player) {
      this.props.getPlayersAndTemplates(this.props.teamId);
    }
    this.checkForTreasuryError();
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUserId !== this.props.ownerId) {
      this.props.history.push(`${this.props.ladder}/team/${this.props.team.id}`);
    }

    if (!prevProps.team && this.props.team) {
      this.setState({
        treasury: this.props.team.treasury,
        playerNumbers: this.playerNumbers(),
      });
    }

    if (!prevProps.player && this.props.player ||
        prevProps.playerId !== this.props.playerId) {
      this.setState({
        name: this.props.player.name,
        number: this.props.player.number,
        playerId: this.props.playerId,
      });
    }

    if (!prevProps.template && this.props.template ||
        prevProps.templateId !== this.props.templateId) {
      this.setState({
        templateId: this.props.templateId,
      });
    }

    this.checkForTreasuryError();

  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) {
      const player = this.state;
      this.props.formAction(player, this.props.history.push);
    }
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (!this.props.team) return false;
    if (this.props.ladder !== '/bloodbowl') return false;

    if (this.props.player && this.state.number === this.props.player.number &&
        this.state.name === this.props.player.name) {
      return false;
    }

    if (this.state.name === '' || this.state.number === '' || !this.state.teamId) {
      return false;
    }

    if (!this.state.playerId && !this.state.templateId) return false;

    if (this.props.templateId) {
      if (this.props.team.treasury < this.props.template.cost) return false;
    }

    return true;
  }

  render() {

    if (!this.props.team) return <></>;

    const title = this.props.player ? 'Edit player' : 'New player';

    return (
      <div className='frame'>
        <h1>{ title }</h1>
        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            { this.playerCard() }
            { this.errorSection() }
            <Field fieldName='number' label='Number'
              maxLength='2' ctx={ this } type='number' />
            <Field fieldName='name' label='Name'
              maxLength='40' ctx={ this } />
            { this.treasuryField() }
            <Field fieldName='playerNumbers' label='Used numbers'
              maxLength='40' ctx={ this } disabled={ true } />
          </div>


          <div className='form-buttons'>
            <ButtonLink text='Cancel' type='cancel'
              path={ `${this.props.ladder}/teamplayers/${this.props.team.id}/edit` } />
            <SubmitButton text='Save changes' active={ this.formValid() } />
          </div>
        </form>


      </div>
    );
    // TODO: Retire player link and upgrade player using SPP link
    // <Link className='retire-link' to={ `${this.props.ladder}/team/${this.props.team.id}/retire` } >
    //   Retire player</Link>
  }

  // subcomponents

  playerCard() {
    if (this.props.player) {
      const player = this.props.player;
      return <PlayerListItem player={ player } key={ player.id }/>;
    }

    if (this.props.template) {
      const template = this.props.template;
      return <TemplateListItem template={ template } key={ template.id } />;
    }

    return;
  }

  playerNumbers() {
    if (!this.props.team || !this.props.players) return '';

    const playerNumbers = this.props.team.playerIds.map(
      playerId => this.props.players[playerId].number);
    return playerNumbers.join(', ');
  }

  treasuryField() {
    if (!this.props.templateId) return;
    return <Field fieldName='treasury' label='Current treasury'
      ctx={ this } disabled={ true } />
  }

  checkForTreasuryError() {
    if (this.props.team && this.props.template) {
      if (this.props.team.treasury < this.props.template.cost) {
        this.props.errors.treasury = 'You don\'t have enough money';
      } else {
        delete this.props.errors.treasury;
      }
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

export default EditPlayer;
