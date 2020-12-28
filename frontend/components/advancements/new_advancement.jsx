import React from 'react';
import { Link } from 'react-router-dom';
import Field from '../general/field';
import SelectList from '../general/select_list';
import PlayerListItem from '../players/player_list_item';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';
import UpDownField from '../general/field_with_up_down';

class NewAdvancement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerId: this.props.playerId,
      advancementId: 'x',
    };
  }

  componentDidMount() {
    if (Object.keys(this.props.advancements).length === 0) {
      this.props.getAdvancements(this.props.playerId);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.currentUserId !== this.props.ownerId) {
      this.props.history.push(`${this.props.ladder}`);
    }

    if (!prevProps.player && this.props.player ||
        prevProps.playerId !== this.props.playerId) {
      this.setState({
        playerId: this.props.playerId,
      });
    }
  }

  submit(e) {
    e.preventDefault();
    if (this.formValid()) {
      const advancement = this.state;
      this.props.formAction(advancement, this.props.history.push);
    }
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') this.setState({ [field]: e.target.value });
    };
  }

  formValid() {
    if (!this.props.player) return false;
    if (this.props.ladder !== '/bloodbowl') return false;

    if (!this.state.playerId) return false;
    if (!this.state.advancementId) return false;
    // TODO: This needs more logic, only if we need a skill ID on this advancement
    if (!this.state.skillId) return false;

    return true;
  }

  render() {
/*
  First choose an advancement
    Only show advancements you can afford
    Also, somehow change the ability ones down to a single option

  ### SKILLS ###

  If the advancement is a skill based
    Choose an appropriate skill group
    Will need to know primary or secondary

  Once skill group is chosen, go get the list of skills from back end
    TODO: Send all the skills to the front-end. This will be a new action

  If random, show an option to randomize or nah

  If computer randomizes, choose a skill and store it

  If player chooses (in either case), show the appropriate dropdown
    WHEW!

  ### STATS ###
  Show randomize buttons

  Randomize, or show dropdown

*/



    if (!this.props.player) return <div></div>;

    return (
      <div className='frame'>
        <h1>Add Advancement</h1>
        <form onSubmit={ this.submit.bind(this) } autoComplete='off'>
          <input autoComplete='false' name='hidden'
            type='text' style={{ display:'none' }} />

          <div className='inputs'>
            { this.playerCard() }
            { this.advancementDropdown() }
            { this.advancementCosts() }
            { this.skillGroupDropdown() }
            { this.skillRandomizeButtons() }
            { this.skillDropdown() }
            { this.statRandomizeButtons() }
            { this.statDropdown() }
          </div>

          <div className='form-buttons'>
            <ButtonLink text='Cancel' type='cancel'
              path={ `${this.props.ladder}/teamplayers/${this.props.player.teamId}/edit` } />
            <SubmitButton text='Add advancement' active={ this.formValid() } />
          </div>
        </form>


      </div>
    );
  }

  // subcomponents

  playerCard() {
    if (this.props.player) {
      const player = this.props.player;
      return <PlayerListItem player={ player } key={ player.id }/>;
    }
    return;
  }

  advancementDropdown() {
    const advancements = Object.values(this.props.advancements);
    const advancementList = [['x', 'Select an advancement...']];
    advancements.map(adv => advancementList.push([adv.id, adv.name]));

    return <SelectList
      fieldName='advancementId'
      label='Advancement'
      ctx={this}
      optionsList={advancementList}
      />;
  }

  advancementCosts() {
    if (this.state.advancementId === 'x') return;
    const advancement = this.props.advancements[this.state.advancementId];
    return <div>{advancement.sppCost} SPP, {advancement.valueIncrease} GP</div>;
  }

  skillGroupDropdown() {
    return;
  }

  skillRandomizeButtons() {
    return;
  }

  skillDropdown() {
    return;

  }

  statRandomizeButtons() {
    return;

  }

  statDropdown() {
    return;

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

export default NewAdvancement;
