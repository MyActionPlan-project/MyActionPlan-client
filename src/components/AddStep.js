import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddStep(props) {
  const [ action, setAction ] = useState("");
  const [ comment, setComment ] = useState("");
  const [ deadline, setDeadline ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ status, setStatus ] = useState("");

  
  const handleSubmit = (e) => {
    e.preventDefault();

    const { actionplanId } = props;

    const navigate = useNavigate;

    let formattedDeadline

        if (deadline) {
            formattedDeadline = new Date(deadline).toISOString();
          } else {
            formattedDeadline = null; 
          }

    const requestBody = { 
        action,
        comment,
        deadline: formattedDeadline,
        location,
        status,
        actionplanId
       };

    const storedToken = localStorage.getItem('authToken')
  
    

  axios.post(`${API_URL}/api/steps`,
    requestBody,
    { headers: {Authorization: `Bearer ${storedToken}` } }
   )
   .then((response) => {
    setAction("");
    setComment("");
    setDeadline("");
    setLocation("");
    setStatus("");

    props.refreshActionplan()
    navigate('/actionplans')
   })
   .catch((error) => console.log(error));
  };

  return (
    <div className="AddStep">
      <h3>Add New Step</h3>
      
      <form onSubmit={handleSubmit}>

        <div>
          <label>Action:</label>
            <input type="text" name="action" value={action} onChange={(e) => setAction(e.target.value)} />
        </div>

        <div>
          <label>Comments:</label>
            <input type="textarea" name="comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        </div>

        <div>
          <label>Deadline:</label>
            <input type="date" name="deadline" value={deadline} onChange={(e) => setDeadline(e.target.value)} required/>
        </div>

        <div>
          <label>Location:</label>
            <input type="text" name="location" value={location} onChange={(e) => setLocation(e.target.value)} />
        </div>

         <div>
            <label>Status:</label>
              <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Unfinished">Unfinished</option>
              </select>
           </div>


        
        <button type="Submit">Add Step</button>
      </form>
    </div>
  )

}


export default AddStep;