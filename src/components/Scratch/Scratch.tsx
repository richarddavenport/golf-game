import React from 'react';
// import { db } from '../../api/firebase';
import { useDocumentSnapshot } from '../useDocumentSnapshot/useDocument';

const Scratch = () => {
  const game = useDocumentSnapshot('games/WeKEbJ6axgU8nxmOAITS');
  const click = async () => {
    console.log('game: ', game.data());
    // db.doc('games/WeKEbJ6axgU8nxmOAITS').set(doc);
  };
  return <button onClick={click}>click</button>;
};

export default Scratch;
