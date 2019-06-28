import isEqual from 'lodash/isEqual';
import React, { useEffect, useState } from 'react';
import { authState } from 'rxfire/auth';
import { auth } from '../../api/firebase';

function withUser(WrappedComponent: any) {
  return (props: any) => {
    const [state, setState] = useState();

    useEffect(() => {
      const sub = authState(auth).subscribe(user => {
        if (!isEqual(user, state)) {
          setState(user);
        }
      });
      return () => sub.unsubscribe();
    });

    return <WrappedComponent user={state} {...props} />;
  };
}

export default withUser;
