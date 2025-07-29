import React, { useState, useEffect } from "react";
import NavbarComponent from "../components/Navbar";
import Button from "react-bootstrap/Button";
import { useFirebase } from "../context/Firebase";
import CardComponent from "../components/Card";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const MyBooks = () => {
  const { getAllBooks, user } = useFirebase(); // ✅ Make sure it's a function
  const [allBooks, setAllBooks] = useState([]);
  const [myBooks, setMyBooks] = useState([]);
  const navigate=useNavigate();

  console.log(user);

 

  useEffect(() => {

    if(!user)return;

    const fetchMyBooks = async () => {
      const all = await getAllBooks(); // ✅ await since getAllBooks is async
      setAllBooks([...all]);
      
      const filtered = all.filter(book => book.author === user.email);
      console.log("Filtered ones: ",filtered);
      setMyBooks([...filtered]);
    };

    fetchMyBooks(); // ✅ call the async function
  }, [getAllBooks, user]); // ✅ add dependencies

  useEffect(() => {
  console.log("Updated allBooks: ", allBooks);
}, [allBooks]);

useEffect(() => {
  console.log("Updated myBooks: ", myBooks);
}, [myBooks]);


  return (
    <>
    <NavbarComponent />
    <div style={{  padding: "16px" }}>
     
      <Button variant="secondary" href="/Newbook">Add New Book</Button>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "16px", marginTop: "20px" }}>
        {myBooks.map((book, index) => (
          <CardComponent key={index} book={book} />
        ))}
      </div>
    </div>
    </>
     
  );
};

export default MyBooks;
