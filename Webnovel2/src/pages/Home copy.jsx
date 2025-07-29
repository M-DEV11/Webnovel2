import React, { useEffect, useState } from "react";
import NavbarComponent from "../components/Navbar";
import { useFirebase } from "../context/Firebase";
import CardComponent from "../components/Card";
import Button from "react-bootstrap/Button";

const genres = ["All", "Romance", "Action", "Adventure", "Fantasy", "Mystery"];

const Home = () => {
  const { getAllBooks } = useFirebase();
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("All");

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await getAllBooks();
      setBooks(allBooks);
      setFilteredBooks(allBooks); // show all initially
    };
    fetchBooks();
  }, []);

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
    if (genre === "All") {
      setFilteredBooks(books);
    } else {
      setFilteredBooks(books.filter(book => book.genre.toLowerCase() === genre.toLowerCase()));
    }
  };

  return (
    <>
      <NavbarComponent />
      
      {/* Genre filter buttons */}
      <div style={{ display: "flex", gap: "12px", padding: "16px", flexWrap: "wrap" }}>
        {genres.map((genre) => (
          <Button
            key={genre}
            variant="secondary"
            active={selectedGenre === genre}
            onClick={() => handleGenreSelect(genre)}
          >
            {genre}
          </Button>
        ))}
      </div>

      {/* Book Cards */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", padding: "16px" }}>
        {filteredBooks.map((book) => (
          <CardComponent key={book.id} book={book} />
        ))}
      </div>
    </>
  );
};

export default Home;
