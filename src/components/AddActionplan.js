import axios from "axios"
import { useState } from "react"


function AddActionplan(){
    const [title, setTitle] = useState()
    const [catagory, setCatagory] = useState()
    const [description, setDescription] = useState()
    const [deadline, setDeadline] = useState()
    const [location, setLocation] = useState()
    const [image, setImage] = useState()
    

    const handleSubmit = (e) => {
      e.preventDefault();
      const actionplanBody = {
        title,
        catagory,
        description,
        deadline,
        location,
        image} 

        axios.post(`${process.env.REACT_APP_API_URL}/api/actionplans`, actionplanBody)
        .then(()=>{
            setTitle("");
            setCatagory("");
            setDescription("");
            setDeadline("");
            setLocation("");
            setImage("");

            // props.refreshActionplan()


        })
        .catch((error) => console.log(error));

    };  

    return(
    
        <form onSubmit={handleSubmit}>
        <input type="text" name="title" value="{title}" placeholder="enter the title" onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" name="catagory" value="{catagory}" placeholder="enter the catagory" onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" name="description" value="{description}" placeholder="enter the description" onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" name="deadline" value="{deadline}" placeholder="enter the deadline" onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" name="location" value="{location}" placeholder="enter the location" onChange={(e) => { setTitle(e.target.value) }} />
        <input type="text" name="image" value="{image}" placeholder="enter the image" onChange={(e) => { setTitle(e.target.value) }} />
        
        <button type="submit"> Create</button>
      </form>

    )

}

export default AddActionplan