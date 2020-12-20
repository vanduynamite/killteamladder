import React from 'react';
import { Link } from 'react-router-dom';
import PlayerCards from '../players/player_cards';

class EditPlayers extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    if (!this.props.team) this.props.getPlayersAndTemplates(this.props.teamId);
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
        { this.availablePositions() }
        { this.players() }
      </div>
    );
  }

  // subcomponents

  availablePositions() {
    if (!this.props.currentTeam) return;
    if (this.props.ladder !== '/bloodbowl') return;
    const playerIds = this.props.currentTeam.playerIds;
    const players = this.props.players;
    if (!playerIds || !players) return;
    return (
      <div id='main-list'>
        <h2>Available positions</h2>
        <PlayerCards players={ players } playerIds={ playerIds } editable={ true }/>;
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
