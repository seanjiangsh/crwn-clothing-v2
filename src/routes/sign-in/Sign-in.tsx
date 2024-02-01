import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";

export default function SignIn() {
  const loginGoogleUser = async () => {
    const userCred = await signInWithGooglePopup();
    const userDocRef = await createUserDocumentFromAuth(userCred);
    console.log(userCred, userDocRef);
  };

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={loginGoogleUser}>Sign in</button>
    </div>
  );
}
