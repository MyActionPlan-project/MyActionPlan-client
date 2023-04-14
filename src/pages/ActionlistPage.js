import axios from "axios";
import { useEffect, useState } from "react";
import AddActionplan from "../components/AddActionplan";

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
          const deadline = new Date(actionplan.deadline);
          const formattedDeadline = deadline.toLocaleDateString('en-GB');

          return (
            <div key={actionplan._id}>
              <h2>Title:{actionplan.title}</h2>
              <p>Category:{actionplan.category}</p>
              <p>Description:{actionplan.description}</p>
              <p>Deadline: {formattedDeadline}</p>
              <p>Location:{actionplan.location}</p>
              {actionplan.image && <img src={actionplan.image} alt={actionplan.title} />}
              {actionplan.steps.length > 0 && (
                <ul>
                  {actionplan.steps.map((step) =>(
                    <li key={step._id}>{step.title}</li>
                  ))}
                </ul>
              )}
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