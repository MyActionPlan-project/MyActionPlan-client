import './HomePage.css';
import { Image } from 'react-bootstrap';
import {Container, Row, Col} from  'react-bootstrap'


function HomePage() {
  return (
    <Container fluid>
    <Row>
      <Col sm={12} md={8} className="mt-5 d-flex">
        <h1 className="homeText">
          {" "}
          From planning to productivity, Our app keeps you one step ahead!
        </h1>
      </Col>
    
       <Col sm={6} md={4}  >
          <Image
            className="homeImg"
            src="/preview.png"
            alt="homepage"
            fluid
          />
        </Col>
      </Row>

      <Row className=" mt-5 d-flex">

        <Col className="d-flex flex-direction-column justify-content-center">
          <Col sm={4} className="d-flex flex-direction-column justify-content-center">
            <img  src="/icons/check-all.svg" alt="check-all" width="23%" height="23%"></img>
            <p className="max-width ">
              {" "}
              Focus on what matters: With our simple and intuitive interface,
              you can quickly and easily add only the necessary tasks to your
              to-do list.
            </p>
          </Col>

          <Col sm={4} className="d-flex flex-direction-column justify-content-center">
          <img  src="/icons/globe2.svg" alt="globe" width="20%" height="20%" ></img>

            <p className="max-width">
              {" "}
              Accessible anywhere, anytime: Our app is cloud-based, so you can
              access it from anywhere and on any device. Whether you're at home,
              at work, or on the go, our app is always there when you need it.
            </p>
          </Col>
          <Col sm={4} className="d-flex flex-direction-column " >
          <img  src="/icons/graph-up-arrow.svg" alt="graph-up-arrow" width="20%" height="20%"></img>
          <p className="max-width">
          {" "}
          Boost your productivity: Our to-do app is designed to help you get more done in less time. 
          </p>
          </Col>
        </Col>
       
      </Row>
    </Container>
  );
}

export default HomePage;
