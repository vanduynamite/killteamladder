import React from 'react';
import { Link } from 'react-router-dom';
import PlayerCards from '../players/player_cards';
import TemplateCards from '../players/template_cards';

class EditPlayers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    if (!this.props.team || !this.props.team.templates) {
      this.props.getPlayersAndTemplates(this.props.teamId);
    }
  }

  componentDidUpdate(prevProps) {

  }

  render() {
    if (!this.props.ownerViewing || this.props.ladder !== '/bloodbowl') {
      return <div></div>;
    }

    return (
      <div className='frame'>
        <h1>
          Edit players
        </h1>
        { this.templates() }
        { this.players() }
      </div>
    );
  }

  // subcomponents

  templates() {
    if (!this.props.currentTeam) return;
    if (this.props.ladder !== '/bloodbowl') return;
    const templateIds = this.props.currentTeam.templates;
    const templates = this.props.templates;
    if (!templateIds || !templates) return;
    return (
      <div id='main-list'>
        <h2>Available positions</h2>
        <TemplateCards templates={ templates } templateIds={ templateIds }/>;
      </div>
    );
  }

  players() {
    if (!this.props.currentTeam) return;
    if (this.props.ladder !== '/bloodbowl') return;
    const playerIds = this.props.currentTeam.playerIds;
    const players = this.props.players;
    if (!playerIds || !players) return;
    return (
      <div id='main-list'>
        <h2>Current players</h2>
        <PlayerCards players={ players } playerIds={ playerIds } editable={ true }/>;
      </div>
    );
  }

}

export default EditPlayers;
