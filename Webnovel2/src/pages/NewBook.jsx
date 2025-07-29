import React, { useState } from "react";
import NavbarComponent from "../components/Navbar";
import Button from "react-bootstrap/Button";
import { useFirebase } from '../context/Firebase';
import { uploadPoster } from '../services/supabase';

const NewBook = () => {
  const { addNewBook, user } = useFirebase();

  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [file, setFile] = useState(null);

  const addBook = async (e) => {
    e.preventDefault();
    if (!user) {
      alert("You must be logged in to add a book.");
      return;
    }

    try {
      let posterUrl = "";
      if (file) {
        posterUrl = await uploadPoster(file, name); // Assumes it returns public URL
      }

      await addNewBook(name, genre, synopsis, posterUrl, user); // ✅ user added here

      alert("Book added successfully!");

    } catch (error) {
      console.error("Failed to add book:", error);
      alert("Error adding book");
    }
  };

  return (
    <>
      <NavbarComponent />
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f8f9fa'
      }}>
        <form onSubmit={addBook} style={{
          width: 400,
          background: '#fff',
          padding: 32,
          borderRadius: 12,
          boxShadow: '0 2px 16px rgba(0,0,0,0.08)'
        }}>
          <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Add New Book</h2>

          <div className="form-group" style={{ marginBottom: 18 }}>
            <label htmlFor="bookName">Book Name</label>
            <input
              type="text"
              className="form-control"
              id="bookName"
              onChange={e => setName(e.target.value)}
              value={name}
              placeholder="Enter Name"
              required
            />
          </div>

          <div className="form-group" style={{ marginBottom: 18 }}>
            <label htmlFor="genre">Genre</label>
            <select
              className="form-control"
              id="genre"
              onChange={e => setGenre(e.target.value)}
              value={genre}
              required
            >
              <option value="">Select Genre</option>
              <option value="romance">Romance</option>
              <option value="action">Action</option>
              <option value="adventure">Adventure</option>
              <option value="fantasy">Fantasy</option>
              <option value="mystery">Mystery</option>
            </select>
          </div>

          <div className="form-group" style={{ marginBottom: 18 }}>
            <label htmlFor="poster">Book Poster</label>
            <input
              type="file"
              className="form-control"
              id="poster"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="form-group" style={{ marginBottom: 18 }}>
            <label htmlFor="synopsis">Synopsis</label>
            <textarea
              className="form-control"
              id="synopsis"
              rows={4}
              placeholder="Enter synopsis here..."
              onChange={e => setSynopsis(e.target.value)}
              value={synopsis}
              required
            />
          </div>

          <Button type="submit" variant="secondary" style={{ width: '100%' }}>
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default NewBook;
