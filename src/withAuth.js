import React, { useEffect, useState } from 'react';
import { authState } from 'rxfire/auth';
import { auth } from './firebase';

function withUser(WrappedComponent) {
  return props => {
    const [user, setUser] = useState(null);

    useEffect(() => {
      const sub = authState(auth).subscribe(user => {
        console.log('user: ', user);
        setUser(user);
      });

      return () => sub.unsubscribe();
    }, []);

    return <WrappedComponent user={user} {...props} />;
  };
}

export default withUser;
