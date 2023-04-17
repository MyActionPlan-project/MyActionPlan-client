import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import AddStep from "../components/AddStep";



function ActionplanDetails(){


const [details, setDetails] = useState(null);

const {actionplanId} = useParams();


 console.log(details)
 
 const getAllSteps = ()=> {
 const storedToken = localStorage.getItem("authToken");

 
    axios
      .get(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}`, { headers: { Authorization: `Bearer ${storedToken}`}})
      .then((detailsFromDB) => {
        console.log(detailsFromDB.data)
        setDetails(detailsFromDB.data);
      })
      .catch((error) => console.log(error));
    }

  useEffect(() => { 
    getAllSteps()
   }, []);

  return (
    <div>
      <h1> Details</h1>
      
            {details ? 
            
        
            <div key={details._id}>
            {details.image && <img src={details.image} alt={details.title} />}
              <h2>{details.title}</h2>
              <p>Category:{details.category}</p>
              <p>Description:{details.description}</p>
              <p>Deadline: {new Date(details.deadline).toLocaleDateString()}</p>
              <p>Location:{details.location}</p>
              

              <Link to={`/actionplans/edit/${actionplanId}`}>
                    <button> edit </button>
                </Link>

              {details.steps.length > 0 && (
                <ul>
                  {details.steps.map((step) => (
                    <>
                    <p key={step._id}> {step.action} </p>
                    {step.comment && <p> {step.comment}</p> }
                    {step.deadline && <p> {step.deadline}</p>}
                    {step.location && <p> {step.location}</p>}
                    <p> {step.status} </p>
                    <Link to={`/actionplans/${actionplanId}/${step._id}`}> Edit </Link> 
                    <hr />
                    </>
                  ))}
                </ul>
              )}
            </div>
       : 
      (<p>Loading...</p>)}
      <div>
        <h1>Add your step here:</h1>
        <AddStep refreshSteps={getAllSteps}/>
      </div>
      
      
    </div>
  );
}

export default ActionplanDetails