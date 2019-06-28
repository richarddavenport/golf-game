import React from 'react';
import { useDocument } from '../useDocument/useDocument';

const UserInfo = ({ uid }) => {
  const user = useDocument(`users/${uid}`);

  if (!user) return null;

  return <div>{user.displayName || user.email}</div>;
};

export default UserInfo;
