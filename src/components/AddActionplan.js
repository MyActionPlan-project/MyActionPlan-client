import axios from "axios"
import { useState } from "react"


function AddActionplan(){
    const [title, setTitle] = useState()
    const [category, setcategory] = useState()
    const [description, setDescription] = useState()
    const [deadline, setDeadline] = useState()
    const [location, setLocation] = useState()
    const [image, setImage] = useState()
    
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const formattedDeadline = new Date(deadline).toISOString();
      const actionplanBody = {
        title,
        category,
        description,
        deadline: formattedDeadline,
        location,
        image} 

        axios.post(`${process.env.REACT_APP_API_URL}/api/actionplans`, actionplanBody)
        .then(()=>{
            setTitle("");
            setcategory("");
            setDescription("");
            setDeadline("");
            setLocation("");
            setImage("");

            // props.refreshActionplan()


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
            <select type="text" name="category" value={category}  onChange={(e) => { setcategory(e.target.value) }}>
              <option value="DIY">DiY</option>
              <option value="vacation">Vacation</option>
              <option value="event">Event</option>
              <option value="training">Training</option>
              <option value="other">Other</option>
            </select>
        </div>

        <div>
          <label>Description:</label>
            <input type="textarea" name="description" value={description}  onChange={(e) => { setDescription(e.target.value) }} />
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
            <input type="text" name="image" value={image}  onChange={(e) => { setImage(e.target.value) }} />
        </div>
        <button type="submit">Create</button>
      </form>
      </div>
    )

}

export default AddActionplan