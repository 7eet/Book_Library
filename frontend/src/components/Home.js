import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { MyContext } from "./Context";
import Card from "./Card";

const Home = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([])
  
  const { setShowLoginButton } = useContext(MyContext);
  const [cookies, setCookie, removeCookie ] = useCookies(["token"]);
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        setShowLoginButton(true)
        return navigate("/login");
      }
      const { data } = await axios.get(
        "http://localhost:5000/books",  { withCredentials: true }
      );

      setBooks(data.books)
      console.log(`data ${data}`);
      setShowLoginButton(false)
    };
    verifyCookie();
  }, []);

  return (
    <>
    <div className="home_page">
      {
        (books === null) ? <Card new={true} /> : 
        
          books.map(e => <Card data={e} key={e._id} />)
      
      }
      </div>
    </>
  );
};

export default Home;
