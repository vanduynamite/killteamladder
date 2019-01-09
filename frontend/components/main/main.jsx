import React from 'react';
import TeamListItem from '../teams/team_list_item';

class Main extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getTeams();
  }

  render() {
    let greeting = this.props.loggedIn ?
      ` ${this.props.currentUser.firstName}` :
      '';

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
        const user = users[team.userId];
        return <TeamListItem
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
