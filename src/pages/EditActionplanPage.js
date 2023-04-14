import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function EditActionPlan(){
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('DIY');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [location, setLocation] = useState('');
  const [image, setImage] = useState('');
  

  const navigate = useNavigate();
  const { actionplanId } = useParams();


  useEffect(() => {
    const storedToken = localStorage.getItem("authToken"); 

   axios
   .get(
     `${API_URL}/api/actionplans/${actionplanId}`,
     { headers: { Authorization: `Bearer ${storedToken}` } }   
   )
   .then((response) => {
    const oneActionplan = response.data;
    setTitle(oneActionplan.title);
    setCategory(oneActionplan.category);
    setDescription(oneActionplan.description);
    setDeadline(oneActionplan.deadline);
    setLocation(oneActionplan.location);
    setImage(oneActionplan.image);
   })
   .catch((error) => console.log(error));
  }, [actionplanId]);




const handleFormSubmit = (e) => {
  e.preventDefault();
  const requestBody = { title, category, description, deadline, location, image }

  const storedToken = localStorage.getItem('authToken');  

  axios
      .put(
        `${API_URL}/api/actionplans/${actionplanId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }              
      )
      .then((response) => {
        navigate(`/actionplans/${actionplanId}`)
      });
    };

    const deleteActionplan = () => {

      const storedToken = localStorage.getItem('authToken');  

      axios
      .delete(
        `${API_URL}/api/actionplans/${actionplanId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }           
      )
      .then(() => navigate("/actionplans"))
      .catch((err) => console.log(err));
  }; 
    
  return (
    <div className="EdidActionplanPage">
      <h2>Edit your actionplan</h2>

      <form onSubmit={handleFormSubmit}>
        
        <div>
          <label>Title:</label>
            <input type="text" name="title" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div>
          <label>Category</label>
            <select name="category"  onChange={(e) => { setCategory(e.target.value) }} required>
               <option value="DIY">DIY</option>
               <option value="Vacation">Vacation</option>
               <option value="Event">Event</option>
               <option value="Training">Training</option>
               <option value="Other">Other</option>
            </select>
        </div>

                <div>
                    <label>Description:</label>
                    <input type="textarea" name="description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
                </div>

                <div>
                    <label>Deadline:</label>
                    <input type="date" name="deadline" value={deadline} onChange={(e) => { setDeadline(e.target.value) }} />
                </div>

                <div>
                    <label>Location:</label>
                    <input type="text" name="location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                </div>

                <div>
                    <label>Image</label>
                    <input type="text" name="image" value={image} onChange={(e) => { setImage(e.target.value) }} />
                </div>

      <button type="Submit">Update Actionplan</button>
      </form>

      <button onClick={deleteActionplan}>Delete Actionplan</button>
    </div>
  )
    
  }

export default EditActionPlan;