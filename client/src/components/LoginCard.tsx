// imort bootstrap card
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.withCredentials = true;
import { login } from '../api/loginRegisterOperation';


/**
 * `LoginCard` is a React functional component that renders a login form.
 * It allows users to input their username and password and submit the form to log in.
 * 
 * @component
 * @example
 * return (
 *   <LoginCard />
 * )
 * 
 * @returns {JSX.Element} A JSX element representing the login card.
 * 
 * @remarks
 * The component maintains two pieces of state: `username` and `password`, which are updated
 * as the user types into the respective input fields. When the form is submitted, it calls
 * an asynchronous `login` function with the username and password. If the login is successful,
 * the user is redirected to the `/todo` page.
 * 
 */
export const LoginCard: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    // try doing something to check if the user is logged in
 
    return (<div>
        <Card className='mt-5 m-2'>
            <Card.Title>
                <h1>Login</h1>
            </Card.Title>
            <Form onSubmit={async (e) => {

                e.preventDefault()
                if (await login(username, password)) {
                    window.location.href = '/todo'
                }
            }}>

                <Form.Label htmlFor="inputUsername5">username</Form.Label>
                <Form.Control
                    type="username"
                    id="inputUsername5"
                    aria-describedby="usernameHelpBlock"
                    onChange={() => {
                        const usernamebox = document.getElementById('inputUsername5')
                        setUsername(usernamebox ? (usernamebox as HTMLInputElement).value : '')
                    }}
                />
                {/* <Form.Text id="passwordUsernameHelpBlock" muted >
                    Your username must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                </Form.Text> */}


                <Form.Label htmlFor="inputPassword5">Password</Form.Label>
                <Form.Control
                    type="password"
                    id="inputPassword5"
                    aria-describedby="passwordHelpBlock"
                    onChange={() => {
                        const passwordbox = document.getElementById('inputPassword5')
                        setPassword(passwordbox ? (passwordbox as HTMLInputElement).value : '')
                    }}
                />
                {/* <Form.Text id="passwordHelpBlock" muted >
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                </Form.Text> */}

                <Form.Control type="submit" value="Log In" className="btn btn-primary mt-1"/>
            </Form>
        </Card>
    </div>)
}