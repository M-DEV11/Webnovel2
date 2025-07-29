import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFirebase } from '../context/Firebase';
import NavbarComponent from '../components/Navbar';
import Button from 'react-bootstrap/esm/Button';
import { useNavigate } from 'react-router-dom';
import ChapterCard from '../components/ChapterCard';

const BookDetails = () => {

  const navigate=useNavigate();

  const newChapter=()=>{
    navigate(`/writing/`+bookId);
  }

  const { bookId } = useParams();
  const { getAllBooks,user,getChapters } = useFirebase();
  const [book, setBook] = useState(null);
  const [chapters,setChapters]=useState([]);

  const openChapter=(id)=>{
    console.log("Clicked!");
    navigate(`/book/`+bookId+`/chapter/`+id);
  }

  

  useEffect(() => {
    const fetchBook = async () => {
      const books = await getAllBooks();
      const chps=await getChapters(bookId);
      const found = books.find(b => b.id === bookId);
      setBook(found);
      const sortedChapters = chps.sort((a, b) => a.time - b.time);
      setChapters(sortedChapters);
    };



    fetchBook();
  }, [bookId]);

  if (!book) return <p>Loading...</p>;

  return (
    <>
      <NavbarComponent />
      <div style={{ padding: '40px 80px', display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
        <img 
          src={book.poster} 
          alt={book.title} 
          style={{ width: '300px', height: 'auto', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} 
        />

        <div>
          <h1 style={{ marginBottom: 12 }}>{book.title}</h1>
          <p><strong>Author:</strong> {book.author}</p>
          <p><strong>Genre:</strong> {book.genre}</p>
          <p><strong>Synopsis:</strong></p>
          <p style={{ lineHeight: 1.6 }}>{book.synopsis}</p>
          {user && user.email===book.author && (<Button variant='secondary' onClick={newChapter}>Add New Chapter</Button>)}
        </div>
      </div>

      <div style={{ backgroundColor: '#f1f1f1', padding: '32px 80px', marginTop: 40 }}>
        <h2 style={{ marginBottom: 16 }}>Chapters</h2>
        {chapters.length === 0 ? (
            <p style={{ color: '#777' }}>No chapters yet...</p>
          ) : (
            chapters.map((chapter) => (
              <ChapterCard key={chapter.id} name={chapter.title} chapID={chapter.id} openChap={openChapter} />
            ))
          )}

      </div>
    </>
  );
};

export default BookDetails;
