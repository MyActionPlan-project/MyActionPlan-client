import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

function AddStep(props) {
  const [action, setAction] = useState("");
  const [comment, setComment] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");
  const [status, setStatus] = useState("");

  const { actionplanId } = useParams();

  const handleSubmit = (e) => {
    e.preventDefault();

    //const { actionplanId } = props;

    let formattedDeadline;

    if (deadline) {
      formattedDeadline = new Date(deadline).toISOString();
    } else {
      formattedDeadline = null;
    }

    const requestBody = {
      action,
      comment,
      deadline: formattedDeadline,
      location,
      status,
      actionplanId,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .post(
        `${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        setAction("");
        setComment("");
        setDeadline("");
        setLocation("");
        setStatus("");

        props.refreshSteps();
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container className="AddStep">
      <Row className="justify-content-center">
        <Col sm={8} md={8} lg={8}>
          <h1 className="text-center mb-1 mt-1">Add New Step</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicAction">
              <Form.Label className="loginsteps mt-1">
                <strong>Action:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="enter your first step here"
                name="action"
                value={action}
                onChange={(e) => setAction(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicComments">
              <Form.Label className="loginsteps mt-1">
                <strong>Comments:</strong> <br />
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="write your comments here"
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicDeadline">
              <Form.Label className="loginsteps mt-1">
                <strong>Deadline:</strong>
              </Form.Label>
              <Form.Control
                type="date"
                name="deadline"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicLocation">
              <Form.Label className="loginsteps mt-1">
                <strong>Location:</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="add a location for this step"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicStatus">
              <Form.Label className="loginsteps mt-1">
                <strong>Status:</strong>
              </Form.Label>
              <Form.Control
                as="select"
                name="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              >
                <option value="" selected disabled>
                  {" "}
                  Select Category{" "}
                </option>
                <option value="Completed">Completed</option>
                <option value="Pending">Pending</option>
                <option value="Unfinished">Unfinished</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Create Step
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AddStep;
