import React from 'react';
import TeamListItem from '../teams/team_list_item';

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.clearPathHistory();
    this.props.getTeams(this.props.ladder);
  }

  render() {
    return (
      <div className='frame'>
        <h1>
          Rankings
        </h1>
        { this.teamDetails() }
      </div>
    );
  }

  teamDetails() {
    const currentUserId = this.props.currentUser ?
      this.props.currentUser.id : 0;

    const teams = this.props.teams;
    const users = this.props.users;

    const teamRecords = Object.values(teams).map(
      team => [team.id, team.points]).sort(
        (a, b) => b[1] - a[1]);

    const teamList = teamRecords.map(
      record => {
        const id = record[0];
        const team = teams[id];
        if (team.ladder !== this.props.ladder || !team.active) return;
        const user = users[team.userId];
        if (!team || !user) return <div key={id}></div>;
        return <TeamListItem
            ladder={ this.props.ladder }
            key={ id }
            team={ team }
            owner={ user }
            currentUserId={ currentUserId }/>;
        });

    return (
      <div id='ranking-list'>
        { teamList }
      </div>
    );
  }
}

export default Main;
