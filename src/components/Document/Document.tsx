import React from 'react';
import { useDocument } from '../useDocument/useDocument';

export interface DocumentProps {
  documentPath: string;
  document: any;
}

const Document: React.FunctionComponent<DocumentProps> = ({ documentPath, document }) => {
  const doc = useDocument(documentPath);
  return doc === undefined ? null : document(doc);
};

export default Document;
