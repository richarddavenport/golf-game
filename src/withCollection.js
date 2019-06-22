import React from 'react';
import { useCollection } from './hooks';

function withCollection(docPath) {
  return WrappedComponent => props => {
    const collection = useCollection(docPath, null);
    return <WrappedComponent collection={collection} {...props} />;
  };
}

export default withCollection;
