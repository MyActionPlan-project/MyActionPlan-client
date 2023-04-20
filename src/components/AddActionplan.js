import axios from "axios";
import { useState } from "react";
import { Form, Button, Container, Col, Row } from "react-bootstrap";




function AddActionplan(props){

  const storedToken = localStorage.getItem("authToken"); 
  const [errorMessage, setErrorMessage] = useState(undefined)


    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('DIY');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');
    const [location, setLocation] = useState('');
   
    

    

    const handleSubmit = (e) => {
        e.preventDefault();
        
        let formattedDeadline

        if (deadline) {
            formattedDeadline = new Date(deadline).toISOString();
          } else {
            formattedDeadline = null; 
          }

        const actionplanBody = {
            title,
            category,
            description,
            deadline: formattedDeadline,
            location,
      
            
        };

        

        axios.post(`${process.env.REACT_APP_API_URL}/api/actionplans`, actionplanBody, { headers: { Authorization: `Bearer ${storedToken}`}  })
          .then((response ) => {
            if (response.data.name === "ValidationError"){
               
            }

                
            setTitle('');
            setCategory('');
            setDescription('');
            setDeadline('');
            setLocation('');
         



            props.refreshActionplans();
             
          })
          .catch((error) => {
            console.log(error)
            //const errorDescription = error.response.data.message;
            //setErrorMessage(errorDescription);
          })
            };  

  return (
    <Container fluid>
      <Row > 
        <Col className="ms-5 me-5">
          <h1 className="text-center mb-1 mt-5">Add your actionplan here:</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicTitle">
              <Form.Label className="loginsteps mt-1">
                <strong>Title</strong>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group controlId="formBasicCategory">
              <Form.Label className="loginsteps mt-1">
                <strong>Category</strong>
              </Form.Label>
              <Form.Control
                as="select"
                name="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="" selected disabled>
                  Select Category
                </option>
                <option value="DIY">DIY</option>
                <option value="Vacation">Vacation</option>
                <option value="Event">Event</option>
                <option value="Training">Training</option>
                <option value="Other">Other</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formBasicDescription">
              <Form.Label className="loginsteps mt-1">
                <strong>Description</strong>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicDeadline">
              <Form.Label className="loginsteps mt-1">
                <strong>Deadline</strong>
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
                <strong>Location</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="location"
                placeholder="Enter location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 mt-3">
              Create
            </Button>
          </Form>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </Col>
      </Row> 
    </Container>
  );
}

export default AddActionplan;
