
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './navbar.css';
import Container from 'react-bootstrap/Container';
import { logout } from '../api/loginRegisterOperation';
import Button from 'react-bootstrap/Button';
// import bootstrap css
import  'bootstrap/dist/css/bootstrap.min.css';


/**
 * NavigationPanel component renders a responsive navigation bar using Bootstrap components.
 * 
 * The navigation bar displays different links and buttons based on the user's login status.
 * 
 * @returns {JSX.Element} The rendered navigation bar component.
 * 
 * The navigation bar includes:
 * - A brand name link.
 * - A toggle button for collapsing the navigation links on smaller screens.
 * - Navigation links for "Todo", "Notes", and "Pomodoro" if the user is logged in.
 * - A "Logged in as" text displaying the username from localStorage if the user is logged in.
 * - A "Logout" button if the user is logged in, otherwise a "Login" button.
 * 
 */
export function NavigationPanel() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="todo">Brand name</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    {(function() {
                        if (localStorage.getItem('username')) {
                            return (
                                <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
                                <Nav.Link href="/todo" >
                                    Todo
                                </Nav.Link>
                                <Nav.Link href="/notes" >
                                    Notes
                                </Nav.Link>
                                <Nav.Link href="/pomodoro" >
                                    Pomodoro
                                </Nav.Link>
        
        
        
        
                            </Nav>
                            );
                        }
                        else {
                            return (
                                <Nav
                                className="me-auto my-2 my-lg-0"
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >

                            </Nav>
                            );
                        }
                    })()}

                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="logged-in-text">
                    Logged in as: {localStorage.getItem('username')}
                    </Navbar.Text>
                    {(()=>{if (localStorage.getItem('username')) {
                        return (<Button variant="outline-success" onClick={logout}>
                            Logout
                        </Button>)
                    }
                    else{
                        return (<Button variant="outline-success" href="/">
                            Login
                        </Button>)
                    }
                    })()}
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}