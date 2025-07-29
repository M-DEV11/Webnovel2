import { createContext, useContext, useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import {
  getFirestore,
  setDoc,
  doc,
  collection,
  getDocs,
  query
} from "firebase/firestore";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyC9c8sWPFU-u5_hIzzpiVxp7s3iu81-fmE",
  authDomain: "webnovel2-f74f3.firebaseapp.com",
  projectId: "webnovel2-f74f3",
  storageBucket: "webnovel2-f74f3.firebasestorage.app",
  messagingSenderId: "711373815500",
  appId: "1:711373815500:web:e5d1fd8aab62aa611f4c69"
};

// Init Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const FirebaseContext = createContext(null);

// ⛳ Custom hook
export const useFirebase = () => useContext(FirebaseContext);

// ✅ All Firebase Functions
export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 🔐 Auth listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  const registerUser = async (email, password) =>
    await createUserWithEmailAndPassword(auth, email, password);

  const loginUser = async (email, password) =>
    await signInWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = async () =>
    await signInWithPopup(auth, googleProvider);

  const logoutUser = async () => {
    await signOut(auth);
    console.log("User logged out");
  };

  const publishChatper=async(content,title,bookId)=>{
    const chapter={
      title:title,
      content:content,
      time:Date.now()
    }
    const chapterID=Date.now().toString();
    await setDoc(doc(db,'books',bookId,'chapters',chapterID),chapter);
    console.log("Doc added!");
  }

const addNewBook = async (name, genre, synopsis, posterUrl = '', user) => {
  const bookID = Date.now().toString();

  const book = {
    title: name,
    genre: genre,
    description: synopsis,
    author: user.displayName || user.email,
    posterUrl: posterUrl,
  };

  await setDoc(doc(db, 'books', bookID), book); // ✅ Save to Firestore
};

const getChapters= async (bookId) => {
  const q=query(collection(db,"books",bookId,"chapters"));
  const allChapters=await getDocs(q);

  const chapters=allChapters.docs.map(doc=>{
    const data=doc.data();
    return{
      id:doc.id,
      content:data.content,
      title:data.title,
      time:data.time      
    }
  })
  return chapters;
};


  const getAllBooks=async()=>{
    const q=query(collection(db,"books"));
    const allBooks=await getDocs(q);

    const books=allBooks.docs.map(doc=>{
      const data=doc.data();
      return {
        id: doc.id,
        title: data.title,
        synopsis: data.description,
        poster: data.posterUrl,
        genre: data.genre,
        author: data.author
      }

    })

    return books;

  }


  return (
    <FirebaseContext.Provider
      value={{
        registerUser,
        loginUser,
        loginWithGoogle,
        logoutUser,
        isLoggedIn: !!user,
        user,
        addNewBook,
        getAllBooks,
        publishChatper,
        getChapters
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};
