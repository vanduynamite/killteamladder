import React from 'react';
import { Link } from 'react-router-dom';
import Field from '../general/field';
import SelectList from '../general/select_list';
import PlayerListItem from '../players/player_list_item';
import ButtonLink from '../general/button_link';
import SubmitButton from '../general/submit_button';

class NewAdvancement extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      playerId: this.props.playerId,
      advancementId: 'x',
      skillGroupId: 'x',
      skillId: 'x',
      selectionMethod: 'x',
      characteristicId: 'x',
      randomSkill: 'x',
      characteristicRoll: 'x',
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
      const newAdvancement = this.state;
      if (newAdvancement.characteristicId) {
        newAdvancement.advancementId = newAdvancement.characteristicId;
      }
      this.props.formAction(newAdvancement, this.props.history.push);
    }
  }

  updateField(field) {
    return e => {
      if (e.target.value !== 'x') {
        const newState = {};
        switch (field) {
          case 'advancementId':
            newState.skillGroupId = 'x';
            newState.selectionMethod = 'x';
            newState.skillId = 'x';
            newState.characteristicId = 'x';
            newState.randomSkill = 'x';
            newState.characteristicRoll = 'x';
            break;

          case 'skillGroupId':
            newState.selectionMethod = 'x';
            newState.skillId = 'x';
            newState.characteristicId = 'x';
            newState.randomSkill = 'x';
            newState.characteristicRoll = 'x';
            break;

          case 'selectionMethod':
            newState.skillId = 'x';
            newState.characteristicId = 'x';
            newState.randomSkill = 'x';
            newState.characteristicRoll = 'x';
            break;

          case 'skillId':
            newState.characteristicId = 'x';
            newState.randomSkill = 'x';
            newState.characteristicRoll = 'x';
            break;

          case 'characteristicId':
            newState.characteristicId = 'x';
            newState.randomSkill = 'x';
            break;

          default:
        }

        if (field === 'selectionMethod' && e.target.value === 'random') {
          const advancement = this.props.advancements[this.state.advancementId];
          if (advancement.requiresSkillId) {
            newState.skillId = this.getRandomSkillId();
            newState.randomSkill = this.props.skills[newState.skillId].name;
          } else {
            newState.characteristicRoll = Math.floor(Math.random() * 16) + 1;
          }
        }
        newState[field] = e.target.value;
        this.setState(newState);
      }
    };
  }

  formValid() {
    if (!this.props.player) return false;
    if (this.props.ladder !== '/bloodbowl') return false;

    if (!this.state.playerId) return false;
    if (!this.state.advancementId || this.state.advancementId === 'x') return false;

    const advancement = this.props.advancements[this.state.advancementId];
    if (advancement.requiresSkillId && this.state.skillId === 'x') return false;
    if (!advancement.requiresSkillId && this.state.characteristicId === 'x') return false;
    if (this.props.player.spp < advancement.sppCost) return false;

    return true;
  }

  render() {
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
            { this.skillGroupDropdown() }
            { this.randomizeButtons() }
            { this.randomlyPickedSkill() }
            { this.skillDropdown() }
            { this.characteristicRoll() }
            { this.statDropdown() }
            { this.advancementCosts() }
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
    const player = this.props.player;
    const advancements = Object.values(this.props.advancements);
    const advancementList = [];
    advancements.forEach(adv => {
      if (adv.sppCost <= player.spp && !adv.statUpgrade) {
        advancementList.push([adv.id, adv.name]);
      }
    });

    advancementList.unshift(['x', 'Select an advancement...']);

    return <SelectList
      fieldName='advancementId'
      label='Advancement'
      ctx={this}
      optionsList={advancementList}
      />;
  }

  skillGroupDropdown() {
    if (this.state.advancementId === 'x') return;
    const advancement = this.props.advancements[this.state.advancementId];
    if (!advancement.requiresSkillId) return;

    const skillGroups = advancement.primarySkill ?
      this.props.player.primarySkillGroups :
      this.props.player.secondarySkillGroups;

    const skillGroupList = [];
    skillGroups.forEach(group => skillGroupList.push([group.id, group.name]));
    skillGroupList.unshift(['x', 'Select a skill group...']);

    return <SelectList
      fieldName='skillGroupId'
      label='Skill Group'
      ctx={this}
      optionsList={skillGroupList}
      />;
  }

  randomizeButtons() {
    if (this.state.advancementId === 'x') return;
    const advancement = this.props.advancements[this.state.advancementId];
    if (!advancement.random) return;
    if (advancement.requiresSkillId && this.state.skillGroupId === 'x') return;

    const options = [
      ['x', 'Select a method...'],
      ['trust', 'I am trustworthy, I will choose!'],
      ['random', 'I am a scoundrel, choose for me!'],
    ];

    return <SelectList
      fieldName='selectionMethod'
      label='Selection Method'
      ctx={this}
      optionsList={options}
      />;
  }

  skillDropdown() {
    if (this.state.advancementId === 'x') return;
    const advancement = this.props.advancements[this.state.advancementId];
    if (!advancement.requiresSkillId) return;
    if (this.state.skillGroupId === 'x') return;
    if (advancement.random && this.state.selectionMethod !== 'trust') return;

    const skillGroupId = this.state.skillGroupId;
    const skills = Object.values(this.props.skills);
    const skillList = this.getSkillList();
    skillList.unshift(['x', 'Select a skill...']);

    return <SelectList
      fieldName='skillId'
      label='Skill'
      ctx={this}
      optionsList={skillList}
      />;
  }

  getRandomSkillId() {
    const list = this.getSkillList();
    return list[Math.floor(Math.random() * list.length)][0];
  }

  getSkillList() {
    const skillGroupId = this.state.skillGroupId;
    const skills = Object.values(this.props.skills);
    const skillList = [];
    skills.forEach(skill => {
      if (skill.groupId != skillGroupId) return;
      if (!this.props.player.potentialSkillIds.includes(skill.id)) return;
      skillList.push([skill.id, skill.name]);
    });

    return skillList;
  }

  randomlyPickedSkill() {
    if (this.state.advancementId === 'x') return;
    const advancement = this.props.advancements[this.state.advancementId];
    if (!advancement.random) return;
    if (this.state.selectionMethod !== 'random') return;
    if (this.state.skillId === 'x') return;

    return <Field fieldName='randomSkill' label='Randomly picked skill'
      ctx={ this } disabled={ true } />;
  }

  statDropdown() {
    if (this.state.advancementId === 'x') return;
    const advancement = this.props.advancements[this.state.advancementId];
    const player = this.props.player;
    if (advancement.requiresSkillId) return;
    const selectionMethod = this.state.selectionMethod;
    if (selectionMethod === 'x') return;

    const characteristicList = selectionMethod === 'trust' ?
      this.getCharacteristicList() :
      this.getRandomCharacteristicList();

    characteristicList.unshift(['x', 'Select a characteristic...']);

    return <SelectList
      fieldName='characteristicId'
      label='Characteristic'
      ctx={this}
      optionsList={characteristicList}
      />;
  }

  getRandomCharacteristicList() {
    const list = this.getCharacteristicList().sort((a, b) => a[0] - b[0]);
    const rand = this.state.characteristicRoll;
    switch (true) {
      case rand <= 7:
        return list.slice(0, 2);

      case rand <= 13:
        return list.slice(0, 3);

      case rand <= 14:
        return list.slice(2, 4);

      case rand <= 15:
        return list.slice(3, 5);

      default:
        return list;
    }
  }

  characteristicRoll() {
    if (this.state.advancementId === 'x') return;
    const advancement = this.props.advancements[this.state.advancementId];
    if (!advancement.random) return;
    if (this.state.selectionMethod !== 'random') return;
    if (this.state.characteristicRoll === 'x') return;

    return <Field fieldName='characteristicRoll' label='Characteristic roll'
      ctx={ this } disabled={ true } />;
  }

  getCharacteristicList() {
    const advancements = Object.values(this.props.advancements);
    const player = this.props.player;
    const characteristicList = [];
    advancements.forEach(adv => {
      if (adv.sppCost <= player.spp && adv.statUpgrade) {
        characteristicList.push([adv.id, adv.name]);
      }
    });
    return characteristicList;
  }

  advancementCosts() {
    if (this.state.advancementId === 'x') return;
    const advancement = this.props.advancements[this.state.advancementId];

    const text = `This advancement will cost ${advancement.sppCost}SPP
      and increase the value of this player by ${advancement.valueIncrease}GP.`;

    return (
      <div className='single-input'>
        <label htmlFor='advancementCost'>
          Advancement Cost
        </label>
        <div className='disabled' id='advancementCost'>{ text }</div>
      </div>
    );
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
