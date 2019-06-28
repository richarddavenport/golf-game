import React from 'react';
import { useCollection } from '../useCollection/useCollection';

function withCollection(collectionPath: string) {
  return (WrappedComponent: any) => (props: any) => {
    const collection = useCollection(collectionPath);
    return <WrappedComponent collection={collection} {...props} />;
  };
}

export default withCollection;
