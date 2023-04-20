import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import AddStep from "../components/AddStep";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import "./ActionplanDetailsPage.css";

function ActionplanDetails() {
  const [details, setDetails] = useState(null);

  const { actionplanId } = useParams();

  console.log(details);

  const getAllSteps = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((detailsFromDB) => {
        console.log(detailsFromDB.data);
        setDetails(detailsFromDB.data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllSteps();
  }, []);

  return (
    <Container>
      {details ? (
        <Row className="mr-10 mt-4">
          <Col md={3} className="pr-md-1">
            <h1>Details</h1>
            <Card>
              <Card.Body className="mb-1">
                <Card.Title className="card-title">{details.title}</Card.Title>
                <Card.Text className="card-text">
                  <strong>Category: </strong> {details.category} <br />
                  <strong>Description: </strong> {details.description} <br />
                  <strong>Deadline: </strong>{" "}
                  {new Date(details.deadline).toLocaleDateString()} <br />
                  <strong>Location: </strong> {details.location}
                </Card.Text>
                <div className="d-flex justify-content-center mt-auto">
                  <Link to={`/actionplans/edit/${actionplanId}`}>
                    <Button>Edit</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </Col>
          <Col md={6} className="px-md-0">
            <AddStep refreshSteps={getAllSteps} style={{ width: "69%" }} />
          </Col>
          <Col md={3} className="pl-md-1">
            {details.steps.length > 0 && (
              <div>
                <h1>Steps</h1>
                <div className="steps-container">
                  <ListGroup className="step-card">
                    {details.steps.map((step) => (
                      <ListGroup.Item className="items" key={step._id}>
                        <p>
                          <strong>Action:</strong> {step.action} <br />
                          {step.comment && (
                            <>
                              <strong>Comments:</strong> {step.comment} <br />
                            </>
                          )}
                          {step.deadline && (
                            <>
                              <strong>Deadline:</strong>{" "}
                              {new Date(step.deadline).toLocaleDateString()}{" "}
                              <br />
                            </>
                          )}
                          {step.location && (
                            <>
                              <strong>Location:</strong> {step.location} <br />
                            </>
                          )}
                          <strong>Status:</strong> {step.status} <br />
                          <div style={{ textAlign: "center" }}>
                            <Link
                              to={`/actionplans/${actionplanId}/${step._id}`}
                            >
                              <button className="btn btn-primary mt-3">
                                Update
                              </button>
                            </Link>
                          </div>
                        </p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </div>
            )}
          </Col>
        </Row>
      ) : (
        <p>Loading...</p>
      )}
    </Container>
  );
}

export default ActionplanDetails;
