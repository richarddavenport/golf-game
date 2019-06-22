import React from 'react';
import Player from './Player';
import SignIn from './SignIn';
import withCollection from './withCollection';
import withDocument from './withDocument';
// import AddUser from './AddUser';

function App({ doc: tournament, collection: users }) {
  return (
    <div>
      <SignIn />
      {tournament &&
        users &&
        users.map(user => <Player key={user.userName} blob={tournament.blob} user={user} />)}
      {/* <AddUser /> */}
    </div>
  );
}

const Tournament = withDocument('tournaments', '034_2019-06-20')(App);
const Users = withCollection('tournaments/034_2019-06-20/users')(Tournament);
export default Users;
