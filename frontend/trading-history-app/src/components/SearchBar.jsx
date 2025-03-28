import React from "react";
import { Form } from "react-bootstrap";

const SearchBar = ({ searchTerm, setSearchTerm }) => {
  return (
    <Form className="mb-4 d-flex justify-content-center">
      <Form.Control
        type="text"
        placeholder="🔍 Search by stock symbol..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value.toUpperCase())}
        style={{
          width: "60%",
          padding: "12px",
          fontSize: "16px",
          borderRadius: "20px",
          border: "1px solid #ccc",
          boxShadow: "0px 3px 10px rgba(0, 0, 0, 0.1)",
          textAlign: "center",
        }}
      />
    </Form>
  );
};

export default SearchBar;
