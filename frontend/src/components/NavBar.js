import React, { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import {Link, useNavigate} from 'react-router-dom';
import { MyContext } from './Context';
const Navbar=()=>{

  const navigate = useNavigate();
  const [ cookies, setCookie, removeCookie ] = useCookies(["token"]);
  
  const {showLoginButton, setShowLoginButton} = useContext(MyContext);

    const logout = () => {
      removeCookie("token");
      setShowLoginButton(true)
    }

    useEffect(() => {
      if (cookies.token) {
        setShowLoginButton(false); 
      }
      else {
        setShowLoginButton(true);
        navigate('/login');
      }
    }, [showLoginButton])
    return (    
                <div className='navBar'>
                    <div className=''>
                        <Link to="/">Books</Link>
                    </div>

                    <div className={!showLoginButton ? "show" : "hide"}>
                        <Link to="/addBook">Add Book</Link>
                    </div>

                    
                            <div className={showLoginButton ? "show" : "hide"}>
                        <Link to="/signup">SignUp</Link>
                    </div>
                    <div>
                    {!showLoginButton ?  <Link  onClick={logout}>Logout</Link> : <Link to="/login">Login</Link>}
                        
                    </div>                
                </div>
    )

}

export default Navbar;