
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import './navbar.css';
import Container from 'react-bootstrap/Container';
import { logout } from '../api/loginRegisterOperation';
import Button from 'react-bootstrap/Button';
// import bootstrap css
import  'bootstrap/dist/css/bootstrap.min.css';


export function NavigationPanel() {
    return (

        <Navbar expand="lg" className="bg-body-tertiary">
            <Container fluid>
                <Navbar.Brand href="todo">Brand name</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
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

                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text className="logged-in-text">
                    Logged in as: {localStorage.getItem('username')}
                    </Navbar.Text>
               
                    <Button variant="outline-success" onClick={logout}>
                        Logout
                    </Button>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}