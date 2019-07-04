import React, { createContext, useEffect, useState } from 'react';
import { authState } from 'rxfire/auth';
import { auth } from '../../api/firebase';

export const UserContext = createContext({
  user: null
});

const UserProvider = ({ children }: { children: any }) => {
  const [user, setUser] = useState();

  useEffect(() => {
    const sub = authState(auth).subscribe(setUser);
    return () => sub.unsubscribe();
  }, []);

  return <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>;
};

export default UserProvider;
