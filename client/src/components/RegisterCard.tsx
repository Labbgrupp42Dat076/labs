// imort bootstrap card
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import axios, { Axios, AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { register } from '../api/loginRegisterOperation';
axios.defaults.withCredentials = true;


export const RegisterCard: React.FC = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   

    // try doing something to check if the user is logged in

    return (<div>
        <Card className='registerCard m-5'>
            <Card.Title>
                Register
            </Card.Title>
            <Form onSubmit={async (e)=>{
                
                e.preventDefault()

                if(await register(username, password)) {
                    window.location.href = '/todo'
                }


            

            }}>

    <Form.Label htmlFor="inputUsername6">username</Form.Label>
                <Form.Control
                    type="username"
                    id="inputUsername6"
                    aria-describedby="usernameHelpBlock"
                    onChange={(e) => {
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
                    onChange={(e) => {
                        const passwordbox= document.getElementById('inputPassword6')
                        setPassword(passwordbox ? (passwordbox as HTMLInputElement).value : '')
                    }}
                />
                {/* <Form.Text id="passwordHelpBlock" muted >
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                </Form.Text> */}
                
                <Form.Control type="submit" value="Register" className="btn btn-primary mt-1"/>
            </Form>
        </Card>
    </div>)
}