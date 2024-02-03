import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";

import SignUp from "./sign-up/Sign-up";

export default function SignIn() {
  const loginGoogleUser = async () => {
    const userCred = await signInWithGooglePopup();
    await createUserDocumentFromAuth(userCred);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={loginGoogleUser}>Sign in</button>
      <SignUp />
    </div>
  );
}
