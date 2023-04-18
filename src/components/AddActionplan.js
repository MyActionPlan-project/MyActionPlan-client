import axios from "axios";
import { useState } from "react";




function AddActionplan(props){

  const storedToken = localStorage.getItem("authToken"); 
  const [errorMessage, setErrorMessage] = useState(undefined)


    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('DIY');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let formattedDeadline

        if (deadline) {
            formattedDeadline = new Date(deadline).toISOString();
          } else {
            formattedDeadline = null; 
          }

        const actionplanBody = {
            title,
            category,
            description,
            deadline: formattedDeadline,
            location,
            image,
            
        };

        

        axios.post(`${process.env.REACT_APP_API_URL}/api/actionplans`, actionplanBody, { headers: { Authorization: `Bearer ${storedToken}`}  })
          .then((response ) => {
            if (response.data.name === "ValidationError"){
               
            }

                
            setTitle('');
            setCategory('');
            setDescription('');
            setDeadline('');
            setLocation('');
            setImage('');



            props.refreshActionplans();
             
          })
          .catch((error) => {
            console.log(error)
            //const errorDescription = error.response.data.message;
            //setErrorMessage(errorDescription);
          })
            };  

    return(
        <div className="AddActionplan">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={title} onChange={(e) => { setTitle(e.target.value) }} required/>
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
                    <input type="textarea" name="description" rows="3" cols="50" value={description}  onChange={(e) => { setDescription(e.target.value) }} />
                </div>

                <div>
                    <label>Deadline:</label>
                    <input type="date" name="deadline" value={deadline} onChange={(e) => { setDeadline(e.target.value) }} required/>
                </div>

                <div>
                    <label>Location:</label>
                    <input type="text" name="location" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                </div>

                <div>
                    <label>Image</label>
                    <input type="text" name="image" value={image} onChange={(e) => { setImage(e.target.value) }} />
                </div>

                <button type="submit">Create</button>
                { errorMessage && <p className="error-message">{errorMessage}</p> }
            </form>
        </div>
    );
}

export default AddActionplan;
