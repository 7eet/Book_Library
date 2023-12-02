import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

const ViewBook = () => {
  const params = useParams();
  const [ cookies, setCookie, removeCookie ] = useCookies(["token"]);
  const navigate = useNavigate();
  const [book, setBook] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        if (!cookies.token) {
          return navigate('/login');
        }
          const res = await axios.get(
            `http://localhost:5000/view/${params.id}`,  { withCredentials: true }
          ); 
          setBook(res.data.data);
          console.log(res.data.data);
      } catch (err) {
          console.log(err);
      }
  }
    fetchData();
  }, []);


  return (
    
      <div className="viewbook">
        
  <h1>{book.title}</h1>
  
  <div className="authorArea">
    <p>by {book?.author?.author}</p> 
  </div>
  
  <div className="descriptionArea">
    <p>{book.description}</p>
  </div>
</div>
      
  );
};

export default ViewBook;
