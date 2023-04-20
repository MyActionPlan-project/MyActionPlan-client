import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";

function EditActionPlan() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DIY");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [location, setLocation] = useState("");

  const navigate = useNavigate();
  const { actionplanId } = useParams();

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => {
        const oneActionplan = response.data;
        setTitle(oneActionplan.title);
        setCategory(oneActionplan.category);
        setDescription(oneActionplan.description);
        setDeadline(oneActionplan.deadline);
        setLocation(oneActionplan.location);
      })
      .catch((error) => console.log(error));
  }, [actionplanId]);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let formattedDeadline;

    if (deadline) {
      formattedDeadline = new Date(deadline).toISOString();
    } else {
      formattedDeadline = null;
    }

    const requestBody = {
      title,
      category,
      description,
      deadline: formattedDeadline,
      location,
    };

    const storedToken = localStorage.getItem("authToken");

    axios
      .put(
        `${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        navigate(`/actionplans/${actionplanId}`);
      });
  };

  const deleteActionplan = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .delete(
        `${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}`,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then(() => navigate("/actionplans"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="Edit-profile-page">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="my-4">
            <Card.Body>
              <h2 className="text-center mb-4">Edit your actionplan</h2>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formTitle">
                  <Form.Label className="mb-0">
                    <strong>Title:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formCategory">
                  <Form.Label className="mb-0">
                    <strong>Category:</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                  >
                    <option value="DIY">DIY</option>
                    <option value="Vacation">Vacation</option>
                    <option value="Event">Event</option>
                    <option value="Training">Training</option>
                    <option value="Other">Other</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDescription">
                  <Form.Label className="mb-0">
                    <strong>Description:</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDeadline">
                  <Form.Label className="mb-0">
                    <strong>Deadline:</strong>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label className="mb-0">
                    <strong>Location:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </Form.Group>

                <Button variant="primary" className="mt-3" type="submit">
                  Update Actionplan
                </Button>
              </Form>

              <Button
                variant="danger"
                className="mt-3"
                onClick={deleteActionplan}
              >
                Delete Actionplan
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default EditActionPlan;
