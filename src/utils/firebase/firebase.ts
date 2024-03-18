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
  collection,
  writeBatch,
  getDocs,
  query,
  QueryDocumentSnapshot,
} from "firebase/firestore";

import SHOP_DATA from "../../shop-data";
import { Category } from "../../types/common";

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

const COLLECTION_KEY = "categories";

export const addCollectionAndDocuments = async (data: typeof SHOP_DATA) => {
  const collectionRef = collection(db, COLLECTION_KEY);
  const collectionSnapshot = await getDocs(collectionRef);
  if (!collectionSnapshot.empty) {
    console.log("has category collections");
    return;
  }

  const batch = writeBatch(db);
  data.forEach((category) => {
    const { title } = category;
    const docRef = doc(collectionRef, title.toLowerCase());
    batch.set(docRef, category);
  });
  await batch.commit();
  console.log("new category collections added");
};

export const getCategoriesAndDocuments = async (): Promise<Array<Category>> => {
  const collectionRef = collection(db, COLLECTION_KEY);
  const q = query(collectionRef);
  const querySnapshot = await getDocs(q);
  const categories = querySnapshot.docs.map((d) => d.data() as Category);
  return categories;
};
