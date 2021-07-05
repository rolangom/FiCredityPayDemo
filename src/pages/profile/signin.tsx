import React from "react";
import firebase from 'firebase';
import * as firebaseui from 'firebaseui'
import { useHistory, useLocation } from "react-router-dom";
import { useUser } from "../../common/utils";

const ui = new firebaseui.auth.AuthUI(firebase.auth());

function SignIn() {
  const { state } = useLocation<{ redirectTo?: string }>();
  const history = useHistory();
  const user = useUser();
  React.useEffect(() => {
    if (user !== null) {
      history.replace(state.redirectTo ?? '/');
    }
  }, [user]);
  React.useEffect(() => {
    const uiConfig: firebaseui.auth.Config = {
      signInOptions: [
        firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      signInFlow: 'popup',
      callbacks: {
        signInSuccessWithAuthResult: (authResult: any, redirectUrl: any) => {

          return false;
        }
      }
    };
    ui.start('#firebaseui-auth-container', uiConfig);
  }, []);

  return (
    <div id="firebaseui-auth-container" className="top_bar_margin"></div>
  );
}

export default SignIn;
