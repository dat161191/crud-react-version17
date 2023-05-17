import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";

export const Header = (props) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">React-Bootstrap</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link  ><NavLink style={{textDecoration:'none'}} exact="true" to="/" activeclassname="active">Home</NavLink></Nav.Link>
                            <Nav.Link >
                                <NavLink style={{textDecoration:'none'}} exact="true" to="/users" activeclassname="active">Manager Users</NavLink>
                            </Nav.Link>
                            <Nav.Link >
                                <NavLink style={{textDecoration:'none'}} exact="true" to="/clocks" activeclassname="active">Manager Clock</NavLink>
                            </Nav.Link>
                            <NavDropdown title="Login/Logout" id="basic-nav-dropdown">
                                <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                                <NavDropdown.Item href="/logut">Logout</NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}