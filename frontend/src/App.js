import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import AddBook from  "./components/AddBook"
import { useCookies } from "react-cookie";
import { MyContext } from "./components/Context";
import { useState } from "react";
import ViewBook from "./components/ViewBook";
import Navbar from "./components/NavBar";

function App() {
  
 

  const [showLoginButton, setShowLoginButton] = useState(true);
  
  
  return (
    <div className="App">
      
      <MyContext.Provider value={{ showLoginButton, setShowLoginButton }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/addBook" element={<AddBook />} />
        <Route path="/book/:id" element={<ViewBook />} />
      </Routes>
      </MyContext.Provider>
    </div>
  );
}

export default App;
