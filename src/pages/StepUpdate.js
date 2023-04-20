import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Card, Form, Button } from "react-bootstrap";



function StepUpdate(props) {

  

  const [ action, setAction ] = useState("");
  const [ comment, setComment ] = useState("");
  const [ deadline, setDeadline ] = useState("");
  const [ location, setLocation ] = useState("");
  const [ status, setStatus ] = useState("");
  
  const {stepId} = useParams();
  const {actionplanId} = useParams();
    //console.log("stepId", stepId)
    //console.log("actionplanId", actionplanId)

 const navigate = useNavigate()

    useEffect(()=>{
      const storedToken = localStorage.getItem('authToken')

        axios.get(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}/${stepId}`, { headers: { Authorization: `Bearer ${storedToken}`}})
        .then(detailsFromDB => {
          setAction(detailsFromDB.data.action)
          setComment(detailsFromDB.data.comment)
          setDeadline(detailsFromDB.data.deadline)
          setLocation(detailsFromDB.data.location)
          setStatus(detailsFromDB.data.status)
        })
        .catch((error) => console.log(error));
    },[stepId, actionplanId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const requestBody = {action, comment, deadline, location, status} 
   
    axios
      .put(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}/${stepId}`, requestBody)
      .then((response) => {
        // Once the request is resolved successfully and the project
        // is updated we navigate back to the details page
        navigate(`/actionplans/${actionplanId}`)
      })
      .catch((err) => console.log("updating", err));
  };
   
  const deleteStep = () => {                   
    
    axios
      .delete(`${process.env.REACT_APP_API_URL}/api/actionplans/${actionplanId}/${stepId}`)
      .then(() => {
        
        navigate(`/actionplans/${actionplanId}`);
      })
      .catch((err) => console.log(err));
  }; 

  return (
    <div className="Edit-profile-page">
      <Row>
        <Col xs={12} md={8} lg={6} className="mx-auto">
          <Card className="my-4">
            <Card.Body>
              <h2 className="text-center mb-4">Edit steps</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formAction">
                  <Form.Label className="mb-0">
                    <strong>Action:</strong>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="action"
                    value={action}
                    onChange={(e) => setAction(e.target.value)}
                  />
                </Form.Group>
  
                <Form.Group className="mb-3" controlId="formComment">
                  <Form.Label className="mb-0">
                    <strong>Comments:</strong>
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    name="comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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
                    required
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
  
                <Form.Group className="mb-3" controlId="formStatus">
                  <Form.Label className="mb-0">
                    <strong>Status:</strong>
                  </Form.Label>
                  <Form.Control
                    as="select"
                    name="status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                    <option value="Unfinished">Unfinished</option>
                  </Form.Control>
                </Form.Group>
  
                <Button variant="primary" className="mt-3" type="submit">
                  Update Steps
                </Button>
              </Form>
  
              <Button
                variant="danger"
                className="mt-3"
                onClick={deleteStep}
              >
                Delete Steps
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
  

}


export default StepUpdate;