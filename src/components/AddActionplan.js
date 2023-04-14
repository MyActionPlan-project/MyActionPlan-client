import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5005";

function AddActionplan(props){

  const storedToken = localStorage.getItem("authToken"); 


    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [location, setLocation] = useState('');
    const [image, setImage] = useState('');
    

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formattedDeadline = new Date(`${deadline}T00:00:00.000Z`).toISOString();
        const actionplanBody = {
            title,
            category,
            description,
            deadline: formattedDeadline,
            location,
            image,
            
        };

        axios.post(`${API_URL}/api/actionplans`, actionplanBody, { headers: { Authorization: `Bearer ${storedToken}`} })
            .then(() => {
                setTitle('');
                setCategory('');
                setDescription('');
                setDeadline('');
                setLocation('');
                setImage('');
                
                props.setRefreshActionplan();
                navigate('/actionplans')
            })
            .catch((error) => console.log(error));
    };  

    return(
        <div className="AddActionplan">
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" value={title} onChange={(e) => { setTitle(e.target.value) }} />
                </div>

                <div>
                    <label>Category</label>
                    <select name="category" value={category} onChange={(e) => { setCategory(e.target.value) }}>
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

                <button type="submit">Create</button>
            </form>
        </div>
    );
}

export default AddActionplan;
