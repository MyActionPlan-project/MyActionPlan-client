import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../context/auth.context';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import './ProfilePage.css';

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
          console.log("this one?", error);
        });
      
    
  }, [user._id]);



  return (
    <Container className="profilecontainer mt-5">
      {userData ? (
        <Row className="justify-content-center mt-4">
          <Col md={6}>
            <Card>
              <Card.Body>
                <Card.Title className="text-center card-title">Your Profile</Card.Title>
                <Card.Text className='profile-text-card '>
                  <p><strong>Name:</strong> {userData.name}</p>
                  <p><strong>Email:</strong> {userData.email}</p>
                  <p><strong>Age:</strong> {userData.age}</p>
                  <p><strong>Telephone Number:</strong> {userData.telephoneNumber}</p>
                  <p><strong>City:</strong> {userData.city}</p>
                </Card.Text>
                <Button as={Link} to={`/edit-profile/${userData._id}`} className="mt-3 d-flex justify-content-center editbtn" >Edit Profile</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default ProfilePage;
