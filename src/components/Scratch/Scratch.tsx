import React from 'react';
// import { db } from '../../api/firebase';
import { useDocument } from '../useDocument/useDocument';
import { Game } from '../../../functions/src/models';

const Scratch = () => {
  const game: Game = useDocument('games/WeKEbJ6axgU8nxmOAITS');
  const click = async () => {
    console.log('game: ', game);
    // db.doc('games/WeKEbJ6axgU8nxmOAITS').set(doc);
  };
  return <button onClick={click}>click</button>;
};

export default Scratch;
