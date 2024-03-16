import { vi } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import * as firebaseUtils from "../../../../utils/firebase/firebase";
import SignUp from "../Sign-up";
import { UserCredential } from "firebase/auth";

describe("SignUp component", () => {
  const user = userEvent.setup();
  const name = "Test User";
  const email = "test@example.com";
  const password = "password123";
  const alertSpy = vi.spyOn(window, "alert");
  alertSpy.mockImplementation(() => {});

  test("renders sign up form", () => {
    const signUp = render(<SignUp />);
    const signUpForm = signUp.getByTestId("sign-up");
    const displayNameInput = signUp.getByTestId("sign-up-input-displayName");
    const emailInput = signUp.getByTestId("sign-up-input-email");
    const passwordInput = signUp.getByTestId("sign-up-input-password");
    const confirmPasswordInput = signUp.getByTestId(
      "sign-up-input-confirmPassword",
    );
    const submitButton = signUp.getByRole("button", { name: "Submit" });
    expect(signUpForm).toBeInTheDocument();
    expect(displayNameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(confirmPasswordInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  test("allows user to enter email", async () => {
    const signUp = render(<SignUp />);
    const emailInput = signUp.getByTestId("sign-up-input-email");
    await user.type(emailInput, email);
    expect(emailInput).toHaveValue(email);
  });

  test("allows user to enter password", async () => {
    const signUp = render(<SignUp />);
    const passwordInput = signUp.getByTestId("sign-up-input-password");
    await user.type(passwordInput, password);
    expect(passwordInput).toHaveValue(password);
  });

  test("allows user to submit form after required fields has input", async () => {
    const mockUserCred = { user: { email } } as UserCredential;
    const createAuthSpy = vi.spyOn(
      firebaseUtils,
      "createAuthUserWithEmailAndPassword",
    );
    const createUserDocSpy = vi.spyOn(
      firebaseUtils,
      "createUserDocumentFromAuth",
    );
    createAuthSpy.mockImplementation(() => Promise.resolve(mockUserCred));
    createUserDocSpy.mockImplementation(() => Promise.resolve());

    const signUp = render(<SignUp />);
    const displayNameInput = signUp.getByTestId("sign-up-input-displayName");
    const emailInput = signUp.getByTestId("sign-up-input-email");
    const passwordInput = signUp.getByTestId("sign-up-input-password");
    const confirmPasswordInput = signUp.getByTestId(
      "sign-up-input-confirmPassword",
    );
    const submitButton = signUp.getByRole("button", { name: "Submit" });

    await user.type(displayNameInput, name);
    expect(submitButton).toBeDisabled();
    await user.type(emailInput, email);
    expect(submitButton).toBeDisabled();
    await user.type(passwordInput, password);
    expect(submitButton).toBeDisabled();
    await user.type(confirmPasswordInput, password);
    expect(submitButton).not.toBeDisabled();
    await user.click(submitButton);

    expect(createAuthSpy).toHaveBeenCalledTimes(1);
    expect(createAuthSpy).toHaveBeenCalledWith(email, password);
    expect(createUserDocSpy).toHaveBeenCalledTimes(1);
    const createUserDocArgs = [mockUserCred.user, { displayName: name }];
    expect(createUserDocSpy).toHaveBeenCalledWith(...createUserDocArgs);
  });

  test("should show alret message after create user failed", async () => {
    const mockErrCode = "auth/invalid-email";
    const createAuthSpy = vi.spyOn(
      firebaseUtils,
      "createAuthUserWithEmailAndPassword",
    );
    createAuthSpy.mockImplementation(() =>
      Promise.reject({ code: mockErrCode }),
    );

    const signUp = render(<SignUp />);
    const displayNameInput = signUp.getByTestId("sign-up-input-displayName");
    const emailInput = signUp.getByTestId("sign-up-input-email");
    const passwordInput = signUp.getByTestId("sign-up-input-password");
    const confirmPasswordInput = signUp.getByTestId(
      "sign-up-input-confirmPassword",
    );
    const submitButton = signUp.getByRole("button", { name: "Submit" });

    await user.type(displayNameInput, name);
    await user.type(emailInput, email);
    await user.type(passwordInput, password);
    await user.type(confirmPasswordInput, password);
    await user.click(submitButton);

    expect(createAuthSpy).toHaveBeenCalledTimes(1);
    expect(createAuthSpy).toHaveBeenCalledWith(email, password);
    expect(alertSpy).toHaveBeenCalledTimes(1);
    const alertMsg = `Failed to create new user: ${mockErrCode}`;
    expect(alertSpy).toHaveBeenCalledWith(alertMsg);
  });
});
