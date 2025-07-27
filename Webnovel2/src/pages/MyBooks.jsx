import React from "react";
import NavbarComponent from "../components/Navbar";
import Button from "react-bootstrap/esm/Button";

const MyBooks = () => {
  return(
    <div>
      <NavbarComponent />
      <h1>My Books</h1>
      <Button variant="secondary">Add New Book</Button>
    </div>
  )
}

export default MyBooks;