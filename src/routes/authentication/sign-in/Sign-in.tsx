import { useState } from "react";
import { AuthError } from "firebase/auth";

import FormInput from "../../../components/form-input/From-input";
import Button from "../../../components/button/Button";
import { SignInContainer, ButtonsContainer } from "./Sign-in.styles";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../utils/firebase/firebase";

type FormFields = { email: string; password: string };
const defaultFromFields: FormFields = { email: "", password: "" };

export default function SignIn() {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { email, password } = formFields;

  const disableSubmit = !email || !password;

  const googleSignIn = async () => {
    await signInWithGooglePopup();
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      await signInAuthUserWithEmailAndPassword(email, password);
    } catch (error) {
      const err = error as AuthError;
      alert("Login failed, please try again");
      console.warn(err);
    }
  };

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = ev.target;
    const field = id.split("-").at(-1);
    if (!field || !Object.keys(formFields).includes(field)) return;
    const newFields = { ...formFields, [field]: value };
    setFormFields(newFields);
  };

  return (
    <SignInContainer>
      <h2>I already have an account</h2>
      <span>Sign in with your email and passrowd</span>
      <form onSubmit={onSubmit}>
        <FormInput
          id="sign-in-input-email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={onChange}
        />
        <FormInput
          id="sign-in-input-password"
          label="Password"
          type="password"
          required
          value={password}
          onChange={onChange}
        />
        <ButtonsContainer>
          <Button type="submit" disabled={disableSubmit}>
            SIGN IN
          </Button>
          <Button
            type="button"
            buttonType="google-sign-in"
            onClick={googleSignIn}
          >
            GOOGLE SIGN IN
          </Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  );
}
