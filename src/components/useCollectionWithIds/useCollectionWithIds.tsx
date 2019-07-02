import { useState, useEffect } from 'react';
import { db } from '../../api/firebase';

export interface DocWithId<T> {
  id: string;
  data: T;
  ref: firebase.firestore.DocumentReference;
}

export function useCollectionWithIds<T>(path: string) {
  const [value, setValue] = useState();

  useEffect(() => {
    const unsubscribe = db.collection(path).onSnapshot(docs => {
      let data: DocWithId<T>[] = [];
      docs.forEach(doc => data.push({ id: doc.id, data: doc.data() as T, ref: doc.ref }));
      setValue(data);
    });
    return () => unsubscribe();
  }, [path]);

  return value;
}
