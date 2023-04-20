import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import Nav from "react-bootstrap/Nav";
import "./Navbar.css";
import { Button, Modal } from "react-bootstrap";

function Navbar() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  //Implemented a Modal from react-bootstrap to confirm if a user wants to logout
  const handleLogOut = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutConfirmation = () => {
    logOutUser();
    setShowLogoutModal(false);
  };

  const handleLogoutCancel = () => {
    setShowLogoutModal(false);
  };

  return (
    <Nav className="custom-navbar" justify variant="tabs" defaultActiveKey="/">
      <Nav.Item>
        <Nav.Link as={NavLink} to="/">

          Home
        </Nav.Link>
      </Nav.Item>

      {isLoggedIn && user && (
        <Nav.Item>
          <Nav.Link as={NavLink} to={`/profile/${user._id}`} >
            Hello {user.name.toUpperCase()}
          </Nav.Link>
        </Nav.Item>
      )}

      {isLoggedIn && (
        <>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/actionplans">
              Actionplans
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link onClick={handleLogOut}>Logout</Nav.Link>
          </Nav.Item>

          <Modal show={showLogoutModal} onHide={handleLogoutCancel}>
            <Modal.Header closeButton>
              <Modal.Title>Logout Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure you want to log out?</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={handleLogoutConfirmation}>
                Logout
              </Button>
              <Button variant="secondary" onClick={handleLogoutCancel}>
                Cancel
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}

      {!isLoggedIn && (
        <>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/signup" >
              Sign up
            </Nav.Link>
          </Nav.Item>

          <Nav.Item>
            <Nav.Link as={NavLink} to="/login" >
              Login
            </Nav.Link>
          </Nav.Item>
        </>
      )}
    </Nav>
  );
}

export default Navbar;
