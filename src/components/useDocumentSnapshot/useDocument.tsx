import { useState, useEffect } from 'react';
import { db } from '../../api/firebase';
import { firestore } from 'firebase';

export function useDocumentSnapshot(documentPath: string) {
  const [value, setValue] = useState();

  useEffect(() => {
    const unsubscribe = db.doc(documentPath).onSnapshot(setValue);
    return () => unsubscribe();
  }, [documentPath]);

  return value as firestore.DocumentSnapshot;
}
