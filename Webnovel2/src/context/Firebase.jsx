import { createContext, useContext, useState, useEffect, use } from "react";
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,GoogleAuthProvider,signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import {getFirestore,addDoc,collection,getDocs} from "firebase/firestore";


const FirebaseContext = createContext(null);

const firebaseConfig = {
  apiKey: "AIzaSyC9c8sWPFU-u5_hIzzpiVxp7s3iu81-fmE",
  authDomain: "webnovel2-f74f3.firebaseapp.com",
  projectId: "webnovel2-f74f3",
  storageBucket: "webnovel2-f74f3.firebasestorage.app",
  messagingSenderId: "711373815500",
  appId: "1:711373815500:web:e5d1fd8aab62aa611f4c69"
};

const app = initializeApp(firebaseConfig);

export const useFirebase = () => useContext(FirebaseContext);
const auth = getAuth(app);
const googleProvier = new GoogleAuthProvider();


export const registerUser = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
}

export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
}

export const loginWithGoogle = async () => {
  const userCredential = await signInWithPopup(auth, googleProvier);
}

export const logoutUser = async () => {
  await signOut(auth);
  console.log("User logged out");
}

export const FirebaseProvider = (props)=>{
  const [user, setUser] = useState(null);

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setUser(user);
    } else {
      setUser(null);
    }
  });
}, []);

const isLoggedIn = (user)? true : false;

  return (
    <FirebaseContext.Provider value={{registerUser,loginUser,loginWithGoogle,isLoggedIn, user,logoutUser}}>
      {props.children} 
    </FirebaseContext.Provider>
  )
}