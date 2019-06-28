import React from 'react';
import withUser from '../withAuth/withAuth';
import './Splash.css';
import SignIn from '../SignIn/SignIn';

const Splash = ({ user, children }) => {
  let userStatusKnown = user !== undefined;
  const Ripples = (
    <div
      style={{
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div className="lds-ripple">
        <div />
        <div />
      </div>
    </div>
  );
  return userStatusKnown ? user === null ? <SignIn /> : children : Ripples;
};

export default withUser(Splash);
