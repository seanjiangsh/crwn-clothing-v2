import { vi } from "vitest";
import * as firebaseAuth from "firebase/auth";
import { User } from "firebase/auth";
import * as firebaseFirestore from "firebase/firestore";

import * as firebaseUtils from "../firebase";

const mockUser = { uid: "123" };
vi.mock("firebase/auth", async () => {
  const actual = await vi.importActual("firebase/auth");
  return {
    ...actual,
    onAuthStateChanged: vi.fn((auth, callback) => {
      callback(mockUser);
      return vi.fn();
    }),
  };
});

vi.mock("firebase/firestore", async () => {
  const actual = await vi.importActual("firebase/firestore");
  return {
    ...actual,
    getDoc: vi.fn(() => Promise.resolve({ exists: () => true })),
    writeBatch: vi.fn(() => ({
      set: vi.fn(() => {}),
      commit: vi.fn(() => Promise.resolve()),
    })),
  };
});

describe("Firebase Utils", () => {
  describe("onAuthStateChangedListener", () => {
    it("should call onAuthStateChanged and callback with user data", () => {
      const spy = vi.spyOn(firebaseAuth, "onAuthStateChanged");
      const callback = vi.fn();
      firebaseUtils.onAuthStateChangedListener(callback);
      expect(spy).toHaveBeenCalled();
      expect(callback).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("createUserDocumentFromAuth", () => {
    it("should only call firebase/store 'getDoc' if user exists", async () => {
      const getDocSpy = vi.spyOn(firebaseFirestore, "getDoc");
      const setDocSpy = vi.spyOn(firebaseFirestore, "setDoc");
      const user = { uid: "test", email: "test@example.com" } as User;
      await firebaseUtils.createUserDocumentFromAuth(user);
      expect(getDocSpy).toHaveBeenCalledTimes(1);
      expect(setDocSpy).toHaveBeenCalledTimes(0);
    });
  });
});
