import React from 'react';

export default ({ match, team, currentUserId }) => {

  return (
    <div>
      { team.teamName }
      { team.faction }
      { match.result }
    </div>
  )

};
