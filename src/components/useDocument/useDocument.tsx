import { useState, useEffect } from 'react';
import { db } from '../../api/firebase';

export function useDocument(documentPath: string) {
  const [value, setValue] = useState();

  useEffect(() => {
    const unsubscribe = db.doc(documentPath).onSnapshot(doc => setValue(doc.data()));
    return () => unsubscribe();
  }, [documentPath]);

  return value;
}
