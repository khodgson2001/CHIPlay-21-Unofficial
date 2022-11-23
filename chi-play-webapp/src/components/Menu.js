import './Menu.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {LinkContainer} from 'react-router-bootstrap'

function Menu(){
return(
    <div className='menu'>
    <Navbar bg="light" expand="lg">
   <Container>
    <Navbar.Brand href="#">React-Bootstrap</Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
     <Nav className="me-auto">
      <LinkContainer to="/"><Nav.Link>Home</Nav.Link></LinkContainer>
      <LinkContainer to="/papers"><Nav.Link>Papers</Nav.Link></LinkContainer>
      <LinkContainer to="/authors"><Nav.Link>Authors</Nav.Link></LinkContainer>
     </Nav>
    </Navbar.Collapse>
   </Container>
  </Navbar>
</div>
)

}
export default Menu;