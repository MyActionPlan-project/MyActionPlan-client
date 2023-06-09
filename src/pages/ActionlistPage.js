import axios from "axios";
import { useContext, useEffect, useState } from "react";
import AddActionplan from "../components/AddActionplan";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { Container, Card, Button, Row, Col } from "react-bootstrap";
import "./ActionlistPage.css";

function Actionlist() {
  const { user } = useContext(AuthContext);

  const [actionplans, setActionplans] = useState(null);

  const getAllActionplans = () => {
    const storedToken = localStorage.getItem("authToken");

    axios
      .get(`${process.env.REACT_APP_API_URL}/api/actionplans`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setActionplans(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getAllActionplans();
  }, []);

  return (
    <Container fluid>
    <Row>
      <Col >
        <div>
          <h1 className="d-flex flex-column align-items-center mt-5">Actionplans</h1>
          {actionplans ? (
            actionplans.map((actionplan) => {
              const isOwner = actionplan.userId === user._id;
              if (isOwner) {
                return (
                  <Card key={actionplan._id} className="mb-3 actionplan-card">
                    <Card.Body >
                      <div className="d-flex flex-column align-items-center">
                        <div className="mb-3">
                          <Card.Title
                            className="text-center mx-auto"
                            style={{ fontSize: "24px" }}
                          >
                            {actionplan.title}
                          </Card.Title>
                        </div>
                        <div>
                          <Link to={`/actionplans/${actionplan._id}`}>
                            <Button
                              className="text-center mx-auto"
                              variant="primary"
                            >
                              Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                );
              } else {
                return null;
              }
            })
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </Col>
      <Col md={7}>
        <div>
          <AddActionplan refreshActionplans={getAllActionplans} />
        </div>
      </Col>
    </Row>
    </Container>
  );
}

export default Actionlist;
