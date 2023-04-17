import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";


const API_URL = "http://localhost:5005";
function EditProfilePage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [city, setCity] = useState("");

  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { logOutUser } = useContext(AuthContext);

  const userId = user._id;
  console.log(user._id);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${API_URL}/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const userDetails = response.data.user;
        console.log(userDetails)
        setName(userDetails.name);
        setEmail(userDetails.email);
        setAge(userDetails.age);
        setTelephoneNumber(userDetails.telephoneNumber);
        setCity(userDetails.city);
      })
      .catch((error) => console.log(error));
  }, [userId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const requestBody = { name, email, age, telephoneNumber, city };

    const storedToken = localStorage.getItem("authToken");

    axios
      .put(`${API_URL}/api/profile/${userId}`, requestBody, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        navigate(`/profile/${user._id}`);
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${API_URL}/api/profile/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        logOutUser();
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };



  return ( 
    <div className="EditProfilePage">
      <h2>Edit your profile</h2>

      <form onSubmit={handleFormSubmit}>
        
        <div>
          <label>Name:</label>
            <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div>
          <label>Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div>
          <label>Age:</label>
            <input type="number" name="age" value={age} min="1" max="110" onChange={(e) => setAge(e.target.value)} />
        </div>

        <div>
          <label>TelephoneNumber:</label>
            <input type="text" name="telephoneNumber" value={telephoneNumber} onChange={(e) => setTelephoneNumber(e.target.value)} />
        </div>

        <div>
          <label>City:</label>
            <input type="text" name="city" value={city} onChange={(e) => setCity(e.target.value)} />
        </div>

        <button type="submit">Update Profile</button>
      </form>

      <button onClick={deleteUser}>Delete Profile</button>
    </div>
  )
}

export default EditProfilePage;
  
