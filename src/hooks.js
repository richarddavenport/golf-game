import { useState, useEffect } from 'react';
import { db } from './firebase';

export function useDocument(collectionPath, docId, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const unsubscribe = db
      .collection(collectionPath)
      .doc(docId)
      .onSnapshot(doc => setValue(doc.data()));
    return () => unsubscribe();
  }, [collectionPath, docId]);

  return value;
}

export function useCollection(path, initialValue) {
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    const unsubscribe = db.collection(path).onSnapshot(docs => {
      let data = [];
      docs.forEach(doc => data.push(doc.data()));
      setValue(data);
    });
    return () => unsubscribe();
  }, [path]);

  return value;
}
