import { vi } from "vitest";
import * as firebaseAuth from "firebase/auth";
import * as firebaseFirestore from "firebase/firestore";
import { User, UserCredential } from "firebase/auth";

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
    doc: vi.fn(() => ({})),
    getDoc: vi.fn(() => Promise.resolve({ exists: () => false })),
    setDoc: vi.fn(() => Promise.resolve()),
    writeBatch: vi.fn(() => ({
      set: vi.fn(() => {}),
      commit: vi.fn(() => Promise.resolve()),
    })),
    collection: vi.fn(() => ({})),
    query: vi.fn(() => ({})),
  };
});

describe("Firebase Utils", () => {
  describe("signInWithGooglePopup", () => {
    it("should call firebase/auth 'signInWithPopup'", () => {
      const spy = vi.spyOn(firebaseAuth, "signInWithPopup");
      firebaseUtils.signInWithGooglePopup();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("createAuthUserWithEmailAndPassword", () => {
    it("should call firebase/auth 'createUserWithEmailAndPassword'", async () => {
      const spy = vi.spyOn(firebaseAuth, "createUserWithEmailAndPassword");
      const args = ["test@example.com", "password"] as const;
      await firebaseUtils.createAuthUserWithEmailAndPassword(...args);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("signInAuthUserWithEmailAndPassword", () => {
    it("should call firebase/auth 'signInWithEmailAndPassword'", async () => {
      const spy = vi.spyOn(firebaseAuth, "signInWithEmailAndPassword");
      const args = ["test@example.com", "password"] as const;
      await firebaseUtils.signInAuthUserWithEmailAndPassword(...args);
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });

  describe("createUserDocumentFromAuth", () => {
    it("should call firebase/store get/setDoc", async () => {
      const getDocSpy = vi.spyOn(firebaseFirestore, "getDoc");
      const setDocSpy = vi.spyOn(firebaseFirestore, "setDoc");
      const user = { uid: "test", email: "test@example.com" } as User;
      await firebaseUtils.createUserDocumentFromAuth(user);
      expect(getDocSpy).toHaveBeenCalledTimes(1);
      expect(setDocSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe("signOutUser", () => {
    it("should call firebase/auth 'signOut'", async () => {
      const spy = vi.spyOn(firebaseAuth, "signOut");
      await firebaseUtils.signOutUser();
      expect(spy).toHaveBeenCalledTimes(1);
    });
  });
});
