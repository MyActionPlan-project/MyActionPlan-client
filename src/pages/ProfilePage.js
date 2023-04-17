import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';

function ProfilePage() {
  
  const [userData, setUserData] = useState(null);

  const { user } = useContext(AuthContext);
  

  const { userId } = useParams( {userId: ''});
  console.log(userId);

  

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    
        
      axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${user._id}`, {
        headers: {
          Authorization: `Bearer ${storedToken}`,
        },
      })
        .then((response) => {
          console.log(response.data)
          setUserData(response.data.user);
        })
        .catch((error) => {
          console.log(error);
        });
      
    
  }, [user._id]);



  return (
    <div>
      {userData ? (
        
        <div>
          <h2>User Profile</h2>
          <p>Name: {userData.name}</p>
          <p>Email: {userData.email}</p>
          <p>Age: {userData.age}</p>
          <p>Telephone Number: {userData.telephoneNumber}</p>
          <p>City: {userData.city}</p>
          <Link to={`/edit-profile/${userData.id}`}>Edit Profile</Link>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default ProfilePage;
