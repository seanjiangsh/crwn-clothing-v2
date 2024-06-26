import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  NextFn,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  QueryDocumentSnapshot,
} from "firebase/firestore";

type UserData = {
  createdAt: Date;
  displayName: string;
  email: string;
};

// * Your web app's Firebase configuration
// * For Firebase JS SDK v7.20.0 and later, measurementId is optional
const config = {
  apiKey: "AIzaSyCYZlTMIP3Y3KnlhYaT7i2zQFYA7wPbHy0",
  authDomain: "crwn-db-dd9f6.firebaseapp.com",
  databaseURL: "https://crwn-db-dd9f6.firebaseio.com",
  projectId: "crwn-db-dd9f6",
  storageBucket: "crwn-db-dd9f6.appspot.com",
  messagingSenderId: "245782079625",
  appId: "1:245782079625:web:4b9e5a6e7c2787a8693e58",
  measurementId: "G-QEXLF3249H",
};

// * Initialize Firebase
initializeApp(config);

// * auth
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const createAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  return userCred;
};

export const signInAuthUserWithEmailAndPassword = async (
  email: string,
  password: string,
) => {
  const userCred = await signInWithEmailAndPassword(auth, email, password);
  return userCred;
};

// * firestore
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  user: User,
  additionalInfo: any = {},
): Promise<QueryDocumentSnapshot<UserData> | void> => {
  const { uid, email } = user;
  const userDocRef = doc(db, "users", uid);
  const userSnapshot = await getDoc(userDocRef);
  const hasUser = userSnapshot.exists();
  if (!hasUser) {
    try {
      const createdAt = new Date();
      await setDoc(userDocRef, { ...additionalInfo, email, createdAt });
    } catch (err) {
      console.warn(err);
    }
  }
  return userSnapshot as QueryDocumentSnapshot<UserData>;
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (
  nextOrObserver: NextFn<User | null>,
) => onAuthStateChanged(auth, nextOrObserver);
