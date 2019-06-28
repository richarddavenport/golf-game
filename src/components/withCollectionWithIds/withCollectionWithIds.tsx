import React from 'react';
import { useCollectionWithIds } from '../useCollectionWithIds/useCollectionWithIds';

function withCollectionWithIds(collectionPath: string) {
  return (WrappedComponent: any) => (props: any) => {
    const collection = useCollectionWithIds(collectionPath);
    return <WrappedComponent collection={collection} {...props} />;
  };
}

export default withCollectionWithIds;
