import axios from "axios";
import { useEffect, useState } from "react";
import AddActionplan from "../components/AddActionplan";
import { Link } from "react-router-dom";

function Actionlist() {
  

  const storedToken = localStorage.getItem("authToken"); 

  const [actionplans, setActionplans] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/actionplans`, { headers: { Authorization: `Bearer ${storedToken}`} } )
      .then((response) => setActionplans(response.data))
      .catch((error) => console.log(error));
  }, []);



  return (
    <div>
      <h1>Action Plans</h1>
      {actionplans ? (
        actionplans.map((actionplan) => {
          return (
            <div key={actionplan._id}>
            <h2>Title:{actionplan.title}</h2>
              <Link to={`/actionplans/${actionplan._id}`}>
                Details
              </Link>
            </div>
          );
        })
      ) 
      : ( <p>Loading...</p>)}
      <div>
        <h1>Add your actionplan here:</h1>
        <AddActionplan />
      </div>
    </div>
  );
}

export default Actionlist;