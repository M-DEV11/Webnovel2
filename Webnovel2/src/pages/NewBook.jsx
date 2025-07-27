

import React from "react";
import NavbarComponent from "../components/Navbar";
import Button from "react-bootstrap/Button";


const NewBook = () => {
  return (
    <>
    <NavbarComponent />
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8f9fa' }}>
      <form style={{ width: 400, background: '#fff', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px rgba(0,0,0,0.08)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24 }}>Add New Book</h2>
        <div className="form-group" style={{ marginBottom: 18 }}>
          <label htmlFor="bookName">Book Name</label>
          <input type="text" className="form-control" id="bookName" placeholder="Enter Name" />
        </div>
        <div className="form-group" style={{ marginBottom: 18 }}>
          <label htmlFor="genre">Genre</label>
          <select className="form-control" id="genre">
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
          <input type="file" className="form-control" id="poster" accept="image/*" />
        </div>
        <div className="form-group" style={{ marginBottom: 18 }}>
          <label htmlFor="synopsis">Synopsis</label>
          <textarea className="form-control" id="synopsis" rows={4} placeholder="Enter synopsis here..."></textarea>
        </div>
        <Button type="submit" variant="secondary" style={{ width: '100%' }}>Submit</Button>
      </form>
    </div>
    </>
  );
}

export default NewBook;