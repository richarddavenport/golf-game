import React from 'react';
import { UserContext } from '../withUserProvider/withUserProvider';

const withUser = (Component: any) => {
  return (props: any) => {
    return (
      <UserContext.Consumer>
        {userContext => <Component {...props} user={userContext.user} />}
      </UserContext.Consumer>
    );
  };
};

export default withUser;
