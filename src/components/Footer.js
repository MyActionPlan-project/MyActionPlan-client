import "./Footer.css";
import { Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <Navbar bg="#3C6255" className="justify-content-center fixed-bottom">

        <p className="footer-text"> Application created in 2023 by, 
          <Link to="https://github.com/SotDok" target="_blank">
            <img
              src="/GitHub-Mark.png"
              alt="GitHub icon"
              className="github-icon"
            />
            <span className="gitname">SotDok</span>
          </Link>
          &nbsp;|&nbsp;
          <Link to="https://github.com/8lom" target="_blank">
            <img
              src="/GitHub-Mark.png"
              alt="GitHub icon"
              className="github-icon"
            />
            <span className="gitname">8lom</span>
          </Link>
        </p>
     
    </Navbar>
  );
}

export default Footer;
