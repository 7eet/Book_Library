import { useNavigate } from "react-router-dom";
import React from "react"


const Card = (props) => {

  const navigate = useNavigate();

  const viewbook = (id) => {
    navigate(`/book/${id}`);
  }

  const goToAddBook = () => {
    navigate("/addBook")
  }


  return(
    <div className="card">
      {
        (props.new) ? <div>
          <h3>No Books, Please Do Add It</h3>
          <div className="card-footer">
          <button onClick={goToAddBook}>Add Book</button>
          </div>
        </div> : <div>
          <h2>{props.data.title} </h2>
          <div className="card-body">
            <h2>- {props.data.author.author}</h2>
            {/* <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.</p> */}
            <p>{props.data.description}</p>
          </div>
          <div className="card-footer">
          <button onClick={() => viewbook(props.data._id)}>View</button>
          </div>
        </div>
      }
      
      
    </div>
)
}
export default Card;