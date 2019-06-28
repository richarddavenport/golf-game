import { useState, useEffect } from 'react';
import { db } from '../../api/firebase';

export interface DocWithId {
  id: string;
  data: firebase.firestore.DocumentData;
  ref: firebase.firestore.DocumentReference;
}

export function useCollectionWithIds(path: string) {
  const [value, setValue] = useState();

  useEffect(() => {
    const unsubscribe = db.collection(path).onSnapshot(docs => {
      let data: DocWithId[] = [];
      docs.forEach(doc => data.push({ id: doc.id, data: doc.data(), ref: doc.ref }));
      setValue(data);
    });
    return () => unsubscribe();
  }, [path]);

  return value;
}
