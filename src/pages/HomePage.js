// import './HomePage.css';
import { Image } from 'react-bootstrap';
import {Container, Row, Col} from  'react-bootstrap'


function HomePage() {
  return (
    <Container className="bg-#A6BB8D" fluid>
    <Row>
      <Col sm={12} md={6} className="mt-5 d-flex">
        <h1 className="display-4 fw-bolder ms-5 text-white"  >
          
          From planning to productivity, Our app keeps you one step ahead!
        </h1>
      </Col>
    
      <Col sm={4} md={4}>
          <Image  className="mt-5 shadow rounded" src="/preview.png" alt="homepage" fluid />
          </Col>
      </Row>

      <Row className="font-size-small mt-5 d-flex text-white ">

          <Col sm={12} md={4} className="d-flex flex-wrap-wrap ">
            <img className="me-4" src="/icons/check-all.svg" alt="check-all" width="65" height="65"></img>
            <p className="fs-5 ">
              Focus on what matters: With our simple and intuitive interface,
              you can quickly and easily add only the necessary tasks to your
              to-do list.
            </p>
          </Col>

          <Col sm={12} md={4} className="d-flex  ">
          <img className="me-4" src="/icons/globe2.svg" alt="globe" width="65" height="65" ></img>

            <p className="fs-5">
              Accessible anywhere, anytime: Our app is cloud-based, so you can
              access it from anywhere and on any device. Whether you're at home,
              at work, or on the go, our app is always there when you need it.
            </p>
          </Col>
          <Col sm={12} md={4} className="d-flex " >
          <img className="me-4" src="/icons/graph-up-arrow.svg" alt="graph-up-arrow" width="65" height="65"></img>
          <p className="fs-5">
          Boost your productivity: Our to-do app is designed to help you get more done in less time. 
          </p>
          </Col>
    
       
      </Row>
    </Container>
  );
}

export default HomePage;
