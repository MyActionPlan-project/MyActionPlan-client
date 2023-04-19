import { useState, useContext } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "./../context/auth.context";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./LoginPage.css";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${process.env.REACT_APP_API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log("JWT token", response.data.authToken);

        storeToken(response.data.authToken);
        authenticateUser();
        navigate("/");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Container className="login-container">
      <Row className="justify-content-center mt-5">
        <Col sm={8} md={6} lg={4}>
          <h1 className="text-center mb-4">Login</h1>
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>
                <strong>Email address</strong>
              </Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmail}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label className="loginsteps mt-4">
                <strong>Password</strong>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Login
            </Button>
          </Form>
          {errorMessage && (
            <p className="text-danger text-center mt-3">{errorMessage}</p>
          )}
          <p className="text-center mt-3 signup-text">
            Don't have an account yet? <Link to={"/signup"}>Sign up</Link> and
            get started!
          </p>
        </Col>
      </Row>
    </Container>
  );
}

export default LoginPage;
