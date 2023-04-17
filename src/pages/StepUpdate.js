import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";




function StepUpdate(props) {

  const storedToken = localStorage.getItem('authToken')

  const [ action, setAction ] = useState("");
  const [ comment, setComment ] = useState("");
  const [ deadline, setDeadline ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ status, setStatus ] = useState("");
  
  const {stepId} = useParams()
  const {actionplanId} = useParams();
    //console.log("stepId", stepId)
    //console.log("actionplanId", actionplanId)

 const navigate = useNavigate()

    useEffect(()=>{
      const storedToken = localStorage.getItem('authToken')

        axios.get(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}/${stepId}`, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(detailsFromDB => {
          setAction(detailsFromDB.data.action)
          setComment(detailsFromDB.data.comment)
          setDeadline(detailsFromDB.data.deadline)
          setLocation(detailsFromDB.data.location)
          setStatus(detailsFromDB.data.status)
        })
        .catch((error) => console.log(error));
    },[stepId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {action, comment, deadline, location, status} 
   
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}/${stepId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/actionplans/${actionplanId}`)
      })
      .catch((err) => console.log("updating", err));
  };
    //const navigate = useNavigate()

    // let formattedDeadline

    //     if (deadline) {
    //         formattedDeadline = new Date(deadline).toISOString();
    //       } else {
    //         formattedDeadline = null; 
    //       }


  return (
    <div className="stepUpdate">
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


        
        <button type="Submit">edit</button>
      </form>
    </div>
  )

}


export default StepUpdate;