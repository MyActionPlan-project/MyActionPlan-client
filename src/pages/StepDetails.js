import axios from "axios";
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function StepDetails(){

    const storedToken = localStorage.getItem("authToken");
    const [details, setDetails] = useState()

    const {stepId} = useParams()
    const {actionplanId} = useParams();
    console.log("stepId", stepId)
    console.log("actionplanId", actionplanId)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}/${stepId}`, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(detailsFromDB => {setDetails(detailsFromDB.data)})
        .catch((error) => console.log(error));
    },[])

    return (
       <div>
        {details 
        ?
        <>
            <p key= {details._id}> Action: {details.action}</p>
            <p> Comment: {details.comment}</p>
            <p> Deadline: {details.deadline}</p>
            <p> Status: {details.status} </p>

        </>
        : (<p>Loading...</p>)
        }

       </div>
    )

    
}

export default StepDetails