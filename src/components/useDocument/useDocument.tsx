import { useState, useEffect } from 'react';
import { db } from '../../api/firebase';

export function useDocument(docPath: string) {
  const [value, setValue] = useState();

  useEffect(() => {
    const unsubscribe = db.doc(docPath).onSnapshot(doc => setValue(doc.data()));
    return () => unsubscribe();
  }, [docPath]);

  return value;
}
