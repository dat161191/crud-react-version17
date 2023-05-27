import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from "react-router-dom";
import logoApp from "../assets/img/logo192.png"

export const Header = (props) => {
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="/">
                        <img src={logoApp} width="30px" height="30px" alt='logo' />
                        <span> Test fresher reactjs</span>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link  >
                                <NavLink style={{ textDecoration: 'none' }} exact="true" to="/" activeclassname="active">Home</NavLink>
                            </Nav.Link>
                            <Nav.Link >
                                <NavLink style={{ textDecoration: 'none' }} exact="true" to="/users" activeclassname="active">Manager Users</NavLink>
                            </Nav.Link>
                            <Nav.Link >
                                <NavLink style={{ textDecoration: 'none' }} exact="true" to="/clocks" activeclassname="active">Manager Clock</NavLink>
                            </Nav.Link>
                        </Nav>

                        <Nav>
                            <NavDropdown title="Login/Logout" id="basic-nav-dropdown">
                                <NavDropdown.Item >
                                    <Nav.Link  >
                                        <NavLink style={{ textDecoration: 'none' }} exact="true" to="/login" activeclassname="active">Login</NavLink>
                                    </Nav.Link>
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/logut">
                                    <Nav.Link  >
                                        <NavLink style={{ textDecoration: 'none' }} exact="true" to="/logout" activeclassname="active">Logout</NavLink>
                                    </Nav.Link>
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}