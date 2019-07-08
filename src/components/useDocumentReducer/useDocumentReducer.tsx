import { useState, useEffect, useReducer } from 'react';
import { db } from '../../api/firebase';
import { firestore } from 'firebase';

export interface Document<T> {
  snapshot: firestore.DocumentSnapshot;
  data: T;
}

export function useDocumentReducer<T>(documentPath: string, reducer: any) {
  const [state, dispatch] = useReducer<React.Reducer<any, any>>(reducer, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = db.doc(documentPath).onSnapshot(snap => {
      dispatch({ type: 'snap', payload: snap });
      setLoading(false);
    });
    return () => unsubscribe();
  }, [documentPath]);

  return [state, dispatch, loading] as [
    Document<T>,
    React.Dispatch<{ type: string; payload: any }>,
    Boolean
  ];
}
