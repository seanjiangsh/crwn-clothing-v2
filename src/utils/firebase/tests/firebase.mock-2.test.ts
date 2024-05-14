import { vi } from "vitest";
import { User, UserCredential } from "firebase/auth";
import * as firebaseFirestore from "firebase/firestore";

import * as firebaseUtils from "../firebase";

vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual("firebase/auth");
  return {
    ...actual,
    signInWithPopup: vi.fn(() => Promise.resolve({} as UserCredential)),
    GoogleAuthProvider: vi.fn(() => ({ setCustomParameters: vi.fn(() => {}) })),
    createUserWithEmailAndPassword: vi.fn(() =>
      Promise.resolve({} as UserCredential),
    ),
    signInWithEmailAndPassword: vi.fn(() =>
      Promise.resolve({} as UserCredential),
    ),
    signOut: vi.fn(() => Promise.resolve()),
  };
});

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
    setDoc: vi.fn(() => Promise.reject()),
  };
});

describe("Firebase Utils", () => {
  describe("createUserDocumentFromAuth", () => {
    it("should call console.warn when error happened", async () => {
      const getDocSpy = vi.spyOn(firebaseFirestore, "getDoc");
      const setDocSpy = vi.spyOn(firebaseFirestore, "setDoc");
      const consoleWarnSpy = vi.spyOn(console, "warn");
      const user = { uid: "test", email: "test@example.com" } as User;
      await firebaseUtils.createUserDocumentFromAuth(user);
      expect(getDocSpy).toHaveBeenCalledTimes(1);
      expect(setDocSpy).toHaveBeenCalledTimes(1);
      expect(consoleWarnSpy).toHaveBeenCalledTimes(1);
    });
  });
});
