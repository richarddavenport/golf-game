import firebase from "firebase/app";
import React from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { auth } from "../../api/firebase";

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  callbacks: {
    signInSuccessWithAuthResult: authResult => {
      return false;
    }
  }
};

function SignIn() {
  return <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={auth} />;
}

export default SignIn;
