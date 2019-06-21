import React from 'react';
import './App.css';
import { useDocument, useCollection } from './useSnapshotChange';
import Player from './Player';

function App() {
  const tournament = useDocument('tournaments', '034_2019-06-20', null);
  const users = useCollection('tournaments/034_2019-06-20/users', null);

  return (
    <div>
      {tournament &&
        users &&
        users.map(user => <Player key={user.userName} blob={tournament.blob} user={user} />)}
    </div>
  );
}

export default App;
