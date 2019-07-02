import React from 'react';
import { useDocument } from '../useDocument/useDocument';

function withDocument(documentPath, docId) {
  return WrappedComponent => props => {
    const doc = useDocument(documentPath, docId, null);
    return <WrappedComponent doc={doc} {...props} />;
  };
}

export default withDocument;
