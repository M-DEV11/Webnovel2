import React, { useState } from 'react'
import './App.css'
import { useFirebase } from './context/Firebase.jsx';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Writing from './pages/Writing.jsx';
import Home from './pages/Home.jsx';
import MyBooks from './pages/MyBooks.jsx';
import NewBook from './pages/NewBook.jsx';
import AboutBooks from './pages/AboutBook.jsx';
import ReadChapter from './pages/ReadChapter.jsx';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/writing/:bookId" element={<Writing />} />
      <Route path="/mybooks" element={<MyBooks />} />
      <Route path="/newBook" element={<NewBook />} />
      <Route path="/book/:bookId" element={<AboutBooks />} />
      <Route path="/book/:bookId/chapter/:chapterId" element={<ReadChapter />} />

     </Routes>
    
    </>
  )
}

export default App
