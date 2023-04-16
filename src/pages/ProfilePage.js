import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function ProfilePage() {
  const [userData, setUserData] = useState(null);
  const storedToken = localStorage.getItem("authToken");

  const { userId } = useParams("");

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      
      axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`, {
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
    }
  }, [storedToken]);

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
