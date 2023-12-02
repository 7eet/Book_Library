import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from "react-cookie";

import { ToastContainer, toast } from "react-toastify";

const AddBook = () => {
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies([]);

  useEffect(()=>{

    if (!cookies.token) {
      navigate("/login");
    }
  }, []);

  const [inputValue, setInputValue] = useState({
    title: "",
    author: "",
    description: "",
  });
  const { title, author, description } = inputValue;
  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:5000/addBook",
        {
          ...inputValue,
        }
      );
      const { success, message } = data;
      if (success) {
          navigate("/");
      } else {
        console.log(message)
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({
      ...inputValue,
      title: "",
      author: "",
      description: "",
    });
  };

  return (
    <div className="form_container">
      <h2>Add Book</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Enter your title"
            onChange={handleOnChange}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="author">Author</label>
          <input
            type="text"
            name="author"
            value={author}
            placeholder="Enter Author"
            onChange={handleOnChange}
            required={true}
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            rows="8"
            cols="3"
            name="description"
            value={description}
            placeholder="Enter description"
            onChange={handleOnChange}
            required={true}
          />
        </div>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
