import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, Form, Container, Row, Col } from "react-bootstrap";

function SignupPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(1);
  const [telephoneNumber, setTelephoneNumber] = useState("");
  const [city, setCity] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);
  const handleAge = (e) => setAge(parseInt(e.target.value));
  const handleTelephoneNumber = (e) => setTelephoneNumber(e.target.value);
  const handleCity = (e) => setCity(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    // Create an object representing the request body
    const requestBody = { email, password, name, age, telephoneNumber, city };

    // Make an axios request to the API
    // If POST request is successful redirect to login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container className="SignupPage">
      <Row className="justify-content-center">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center mb-1 mt-1">Register Form</h1>

          <Form onSubmit={handleSignupSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label className="loginsteps mt-1">
                <strong>Email</strong>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmail}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="loginsteps mt-1">
                <strong>Password</strong>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
            </Form.Group>

            <Form.Group controlId="formBasicName">
              <Form.Label className="loginsteps mt-1">
                <strong>Name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={handleName}
              />
            </Form.Group>

            <Form.Group controlId="formBasicAge">
              <Form.Label className="loginsteps mt-1">
                <strong>Age</strong>
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter your age"
                value={age}
                min="1"
                max="110"
                onChange={handleAge}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicTelephoneNumber">
              <Form.Label className="loginsteps mt-1">
                <strong>Telephone Number</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your telephone number"
                value={telephoneNumber}
                onChange={handleTelephoneNumber}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCity">
              <Form.Label className="loginsteps mt-1">
                <strong>City</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your location"
                value={city}
                onChange={handleCity}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Sign Up
            </Button>
          </Form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <p className="text-center mt-3 signup-text">
            Already have an account?
            <Link to={"/login"}>Login</Link>
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default SignupPage;
