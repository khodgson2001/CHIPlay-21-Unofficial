import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap';
import NavDropdown from 'react-bootstrap/NavDropdown';

/**
 * Navigation Bar Component
 * 
 * Contains links to all parts of the web application - routes set in App.js
 * 
 * @author Kieran Hodgson
 */

function Menu(){
return(
    <div className='menu'>
    <Navbar bg="dark" expand="lg" variant="dark">
   <Container>
    <LinkContainer to="/"><Navbar.Brand>CHIPlay Application</Navbar.Brand></LinkContainer>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
      <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
      <NavDropdown title="Papers" id="basic-nav-dropdown">
      <LinkContainer to="/papers"><NavDropdown.Item>All Papers</NavDropdown.Item></LinkContainer>
        <LinkContainer to="/papers/Interactivity"><NavDropdown.Item>Interactivity</NavDropdown.Item></LinkContainer>
        <LinkContainer to="/papers/wip"><NavDropdown.Item>Work in Progress</NavDropdown.Item></LinkContainer>
        <LinkContainer to="/papers/fullpapers"><NavDropdown.Item>Full Papers</NavDropdown.Item></LinkContainer>
        <LinkContainer to="/papers/competition"><NavDropdown.Item>Student Game Design Competition</NavDropdown.Item></LinkContainer>
        <LinkContainer to="/papers/doctoral"><NavDropdown.Item>Doctoral Consortium</NavDropdown.Item></LinkContainer>
        <LinkContainer to="/papers/rapid"><NavDropdown.Item>Rapid Communications</NavDropdown.Item></LinkContainer>
     </NavDropdown>
      <LinkContainer to="/authors"><Nav.Link>Authors</Nav.Link></LinkContainer>
      <LinkContainer to="/admin"><Nav.Link>Admin</Nav.Link></LinkContainer>
     </Nav>
    </Navbar.Collapse>
   </Container>
  </Navbar>
</div>
)

}
export default Menu;