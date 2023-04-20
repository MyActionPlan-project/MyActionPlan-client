import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/auth.context";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import "./EditProfilePage.css";

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

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/profile/${userId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const userDetails = response.data.user;
        console.log(userDetails);
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
      .put(
        `${process.env.REACT_APP_API_URL}/api/profile/${userId}`,
        requestBody,
        {
          headers: { Authorization: `Bearer ${storedToken}` },
        }
      )
      .then((response) => {
        navigate(`/profile/${user._id}`);
      })
      .catch((error) => console.log(error));
  };

  const deleteUser = () => {
    const storedToken = localStorage.getItem("authToken");
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/profile/${user._id}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then(() => {
        logOutUser();
        navigate("/login");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="Edit-profile-page">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="my-4">
            <Card.Body>
              <h2 className="text-center mb-4">Edit your profile</h2>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label className="mb-0">
                    <strong>Name:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label className="mb-0">
                    <strong>Email:</strong>
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAge">
                  <Form.Label className="mb-0">
                    <strong>Age:</strong>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="age"
                    value={age}
                    min="1"
                    max="110"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formTelephoneNumber">
                  <Form.Label className="mb-0">
                    <strong>Telephone Number:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="telephoneNumber"
                    value={telephoneNumber}
                    onChange={(e) => setTelephoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCity">
                  <Form.Label className="mb-0">
                    <strong>City:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" className="mt-3" type="submit">
                  Update Profile
                </Button>
              </Form>

              <Button variant="danger" className="mt-3 " onClick={deleteUser}>
                Delete Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditProfilePage;
