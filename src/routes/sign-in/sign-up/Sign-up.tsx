import React, { useState } from "react";
import { AuthError } from "firebase/auth";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../../utils/firebase/firebase";

import "./Sign-up.css";
import FormInput from "../../../components/form-input/FromInput";
import Button from "../../../components/button/Button";

type FormFields = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};
const defaultFromFields: FormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function SignUp() {
  const [formFields, setFormFields] = useState(defaultFromFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const disableSubmit =
    !displayName ||
    !email ||
    !password ||
    !confirmPassword ||
    password !== confirmPassword;

  const onChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = ev.target;
    const field = id.split("-").at(-1);
    if (!field || !Object.keys(formFields).includes(field)) return;
    const newFields = { ...formFields, [field]: value };
    setFormFields(newFields);
  };

  const onSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    try {
      const args = [email, password] as const;
      const userCred = await createAuthUserWithEmailAndPassword(...args);
      const info = { displayName };
      const userDocRef = await createUserDocumentFromAuth(userCred, info);
      console.log(userCred, userDocRef);
    } catch (error) {
      const err = error as AuthError;
      const msg = `Failed to create new user: ${err.code}`;
      alert(msg);
    }
  };

  return (
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and passrowd</span>
      <form onSubmit={onSubmit}>
        <FormInput
          id="sign-up-input-displayName"
          label="Display Name"
          type="text"
          required
          value={displayName}
          onChange={onChange}
        />
        <FormInput
          id="sign-up-input-email"
          label="Email"
          type="email"
          required
          value={email}
          onChange={onChange}
        />
        <FormInput
          id="sign-up-input-password"
          label="Password"
          type="password"
          required
          value={password}
          onChange={onChange}
        />
        <FormInput
          id="sign-up-input-confirmPassword"
          label="Confirm Password"
          type="password"
          required
          value={confirmPassword}
          onChange={onChange}
        />
        <Button type="submit" disabled={disableSubmit}>
          Submit
        </Button>
      </form>
    </div>
  );
}
