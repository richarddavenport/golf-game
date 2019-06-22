import React from 'react';
import { useDocument } from './hooks';

function withDocument(collectionPath, docId) {
  return WrappedComponent => props => {
    const doc = useDocument(collectionPath, docId, null);
    return <WrappedComponent doc={doc} {...props} />;
  };
}

export default withDocument;
