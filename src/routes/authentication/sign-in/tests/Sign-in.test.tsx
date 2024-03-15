import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserCredential } from "firebase/auth";

import * as firebaseUtils from "../../../../utils/firebase/firebase";
import SignIn from "../Sign-in";

describe("SignIn component", () => {
  const user = userEvent.setup();
  const alertSpy = vi.spyOn(window, "alert");
  alertSpy.mockImplementation(() => {});

  beforeEach(() => {
    render(<SignIn />);
  });

  it("renders the sign-in form", () => {
    const emailInput = screen.getByTestId("sign-in-input-email");
    const passwordInput = screen.getByTestId("sign-in-input-password");
    const signInButton = screen.getByRole("button", { name: "SIGN IN" });
    const googleSignInButton = screen.getByRole("button", {
      name: "GOOGLE SIGN IN",
    });

    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(signInButton).toBeInTheDocument();
    expect(googleSignInButton).toBeInTheDocument();
  });

  it("calls signInAuthUserWithEmailAndPassword when email sign-in", async () => {
    const spy = vi.spyOn(firebaseUtils, "signInAuthUserWithEmailAndPassword");
    spy.mockImplementation(() => Promise.resolve({} as UserCredential));

    const emailInput = screen.getByTestId("sign-in-input-email");
    const passwordInput = screen.getByTestId("sign-in-input-password");
    const signInButton = screen.getByRole("button", { name: "SIGN IN" });

    const email = "test@example.com";
    const password = "password";
    await user.type(emailInput, email);
    await user.type(passwordInput, password);

    expect(signInButton).not.toBeDisabled();
    await user.click(signInButton);

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy).toHaveBeenCalledWith(email, password);
  });

  it("sign-in failed", async () => {
    const loginSpy = vi.spyOn(
      firebaseUtils,
      "signInAuthUserWithEmailAndPassword",
    );
    loginSpy.mockImplementation(() => Promise.reject({} as UserCredential));

    const emailInput = screen.getByTestId("sign-in-input-email");
    const passwordInput = screen.getByTestId("sign-in-input-password");
    const signInButton = screen.getByRole("button", { name: "SIGN IN" });

    const email = "test@example.com";
    const password = "password";
    await user.type(emailInput, email);
    await user.type(passwordInput, password);

    expect(signInButton).not.toBeDisabled();
    await user.click(signInButton);

    expect(alertSpy).toHaveBeenCalled();
    expect(alertSpy).toHaveBeenCalledWith("Login failed, please try again");
  });

  it("calls signInWithGooglePopup when the 'GOOGLE SIGN IN' button is clicked", async () => {
    const spy = vi.spyOn(firebaseUtils, "signInWithGooglePopup");
    spy.mockImplementation(() => Promise.resolve({} as UserCredential));

    const googleSignInButton = screen.getByRole("button", {
      name: "GOOGLE SIGN IN",
    });

    await user.click(googleSignInButton);
    expect(spy).toHaveBeenCalled();
  });
});
