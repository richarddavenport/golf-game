import React from 'react';
import { UserContext } from '../withUserProvider/withUserProvider';

const withUser = (Component: any) => {
  return (props: any) => {
    return (
      <UserContext.Consumer>{user => <Component {...props} user={user} />}</UserContext.Consumer>
    );
  };
};

export default withUser;
