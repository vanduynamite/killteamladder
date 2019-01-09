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

    greeting += '! Right now all teams are shown with their primary key rather than their ranking.';

    return (
      <div className='frame'>
        <h1>
          Rankings
        </h1>
        { `Hi${greeting}` }
        { this.teamDetails() }
      </div>
    );
  }

  teamDetails() {
    const users = this.props.users;
    const currentUserId = this.props.currentUser ?
      this.props.currentUser.id : 0;

    const teamList = Object.values(this.props.teams).map(
      team => <TeamListItem
            key={ team.id }
            team={ team }
            owner={ users[team.userId] }
            currentUserId={ currentUserId }/>
    );

    return (
      <div id='my-teams'>
        { teamList }
      </div>
    );
  }
}

export default Main;
