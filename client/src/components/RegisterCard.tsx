// imort bootstrap card
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from '../api/loginRegisterOperation';
axios.defaults.withCredentials = true;


/**
 * RegisterCard component allows users to register by providing a username and password.
 * 
 * @component
 * @example
 * return (
 *   <RegisterCard />
 * )
 * 
 * @returns {JSX.Element} The rendered RegisterCard component.
 * 
 * @remarks
 * This component uses React hooks to manage the state of the username and password inputs.
 * On form submission, it attempts to register the user and redirects to the '/todo' page upon success.
 * 
 */
export const RegisterCard: React.FC = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   
    // try doing something to check if the user is logged in

    return (
        <div>
            <Card className='registerCard m-5' id="register-card">
                <Card.Title>
                    <h2>Register</h2>
                </Card.Title>
                <Form onSubmit={
                    async (e)=>{
                        e.preventDefault()
                        if(await register(username, password)) {
                            window.location.href = '/todo'
                        }
                    }
                }>

                <Form.Label htmlFor="inputUsername6">Username</Form.Label>
                    <Form.Control
                        type="username"
                        id="inputUsername6"
                        aria-describedby="usernameHelpBlock"
                        onChange={() => {
                            const   usernamebox= document.getElementById('inputUsername6')
                            setUsername( usernamebox ? ( usernamebox as HTMLInputElement).value : '')
                        }}
                    />
                    {/* <Form.Text id="passwordUsernameHelpBlock" muted >
                        Your username must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Text> */}

        
                    <Form.Label htmlFor="inputPassword6">Password</Form.Label>
                    <Form.Control
                        type="password"
                        id="inputPassword6"
                        aria-describedby="passwordHelpBlock"
                        onChange={() => {
                            const passwordbox= document.getElementById('inputPassword6')
                            setPassword(passwordbox ? (passwordbox as HTMLInputElement).value : '')
                        }}
                    />
                    {/* <Form.Text id="passwordHelpBlock" muted >
                        Your password must be 8-20 characters long, contain letters and numbers,
                        and must not contain spaces, special characters, or emoji.
                    </Form.Text> */}
                    
                    <Form.Control type="submit" value="Register Now" className="btn btn-primary mt-1" id="register"/>
                </Form>
            </Card>
        </div>
    )
}
