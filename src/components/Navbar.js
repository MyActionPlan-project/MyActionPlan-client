import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";


function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <Nav className="custom-navbar" justify variant="tabs" defaultActiveKey="/">
    <Nav.Item>
      <Nav.Link as={NavLink} to="/" exact>
        Home
      </Nav.Link>
    </Nav.Item>

    {isLoggedIn && user && (
      <Nav.Item>
        <Nav.Link as={NavLink} to={`/profile/${user._id}`} exact>{user.name.toUpperCase()}'s
          Profile
        </Nav.Link>
      </Nav.Item>
    )}

    {isLoggedIn && (
      <>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/actionplans" exact>
            Actionplans
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
            <Nav.Link onClick={logOutUser}>Logout</Nav.Link>
        </Nav.Item>
      </>
    )}

    {!isLoggedIn && (
      <>
        <Nav.Item>
          <Nav.Link as={NavLink} to="/signup" exact>
            Sign up
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link as={NavLink} to="/login" exact>
            Login
          </Nav.Link>
        </Nav.Item>
      </>
    )}
  </Nav>
  );
}

export default Navbar;
