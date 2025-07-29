import React from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useNavigate } from "react-router-dom";

const CardComponent=({book})=>{
  if(!book){
    console.log("No Book");
    return;
  }

  const navigate=useNavigate();

  const toBookPage = () => {
  navigate(`/book/${book.id}`); // assuming book has a unique ID
};


  return(
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={book.poster} />
      <Card.Body>
        <Card.Title>{book.title}</Card.Title>
        <Card.Text>
          {book.synopsis}
        </Card.Text>
        <Button variant="primary" onClick={toBookPage}>Read</Button>
      </Card.Body>
    </Card>
  )
}

export default CardComponent;