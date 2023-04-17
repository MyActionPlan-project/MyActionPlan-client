import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddActionplan from "../components/AddActionplan";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
function Actionlist() {
  
  const { user } = useContext(AuthContext);

  const [actionplans, setActionplans] = useState(null);

  const getAllActionplans = ()=> {

    const storedToken = localStorage.getItem("authToken"); 

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/actionplans`, { headers: { Authorization: `Bearer ${storedToken}`} } )
      .then((response) => setActionplans(response.data))
      .catch((error) => console.log(error));
}

useEffect(() => {
  getAllActionplans()
}, []);


  return (
    <div>
      <h1>Action Plans</h1>
      {actionplans ? (
        actionplans.map((actionplan) => {

          const isOwner = actionplan.userId === user._id
          if (isOwner){
          return (
            <div key={actionplan._id}>
            <h2>{actionplan.title}</h2>
              <Link to={`/actionplans/${actionplan._id}`}>
                Details
              </Link>
            </div>
          )};
        })
      ) 
      : ( <p>Loading...</p>)}
      <div>
        <h1>Add your actionplan here:</h1>
        <AddActionplan refreshActionplans={getAllActionplans}/>
      </div>
    </div>
  );
}

export default Actionlist;