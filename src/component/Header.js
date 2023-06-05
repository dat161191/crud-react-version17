import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";
import logoApp from "../assets/img/logo192.png";
import { toast } from 'react-toastify';
import { useContext } from 'react';
import { UserContext } from '../context/UserContext';

export const Header = (props) => {
    const navigate = useNavigate();
    const { logout, user } = useContext(UserContext);
    const handleLogout = () => {
        logout();
        navigate("/");
        toast.success("Logout success!");
    }
    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand>
                        <NavLink style={{ textDecoration: 'none' }} exact="true" to="/" activeclassname="active">
                            <img src={logoApp} width="30px" height="30px" alt='logo' />
                            <span> Test fresher reactjs</span>
                        </NavLink>
                    </Navbar.Brand>
                    <Navbar.Collapse id="basic-navbar-nav">
                        {(localStorage.getItem("token") || window.location.pathname === "/") &&
                            < Nav className="me-auto">
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
                        }
                        <Nav>
                            {localStorage.getItem("token") && <Nav.Link className='text-danger'>Welcome: {localStorage.getItem("email")}</Nav.Link>}
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                {localStorage.getItem("token") ?
                                    <NavDropdown.Item onClick={() => handleLogout()}>
                                        <NavLink style={{ textDecoration: 'none' }} exact="true" activeclassname="active">Logout</NavLink>
                                    </NavDropdown.Item>
                                    :
                                    <>
                                        <NavDropdown.Item >
                                            <NavLink style={{ textDecoration: 'none' }} exact="true" to="/login" activeclassname="active">Login</NavLink>
                                        </NavDropdown.Item>
                                        <NavDropdown.Item >
                                            <NavLink style={{ textDecoration: 'none' }} exact="true" to="/login" activeclassname="active">PersonPage</NavLink>
                                        </NavDropdown.Item>
                                    </>
                                }
                            </NavDropdown>
                        </Nav>

                    </Navbar.Collapse>
                </Container>
            </Navbar >
        </>
    )
}