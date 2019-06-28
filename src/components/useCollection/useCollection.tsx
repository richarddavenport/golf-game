import { useState, useEffect } from 'react';
import { db } from '../../api/firebase';

export function useCollection(collectionPath: string) {
  const [value, setValue] = useState();

  useEffect(() => {
    const unsubscribe = db.collection(collectionPath).onSnapshot(docs => {
      let data: firebase.firestore.DocumentData[] = [];
      docs.forEach(doc => data.push(doc.data()));
      setValue(data);
    });
    return () => unsubscribe();
  }, [collectionPath]);

  return value;
}
