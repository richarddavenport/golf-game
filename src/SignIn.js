import firebase from 'firebase/app';
import React from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import { auth } from './firebase';
import withUser from './withAuth';

const uiConfig = {
  signInFlow: 'popup',
  signInSuccessUrl: '/signedIn',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

function SignIn({ user }) {
  firebase.auth().signOut();
  return user && <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
}

export default withUser(SignIn);
