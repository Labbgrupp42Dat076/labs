// imort bootstrap card
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import React, { useState, useEffect } from 'react';
import axios, { Axios, AxiosError } from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
axios.defaults.withCredentials = true;


export const LoginCard: React.FC = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
   

    // try doing something to check if the user is logged in


    async function register() {
            
            try{
            const res = await axios.post('http://localhost:8080/user/register', {
                name: username,
                password: password
            })
        } catch (e: AxiosError) {
            console.error(e)
            if (e.response.status === 400){
                alert("user already exists")
            }
            return false
        }
    return (<div>
        <Card>
            <Card.Title>
                Register
            </Card.Title>
            <Form onSubmit={(e)=>{
                
                e.preventDefault()
                register()

                //Redirect to todos
                window.location.href = '/todo'

            }}>

    <Form.Label htmlFor="inputUsername5">username</Form.Label>
                <Form.Control
                    type="username"
                    id="inputUsername5"
                    aria-describedby="usernameHelpBlock"
                    onChange={(e) => {
                        const   usernamebox= document.getElementById('inputUsername5')
                        setUsername( usernamebox ? ( usernamebox as HTMLInputElement).value : '')
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
                    onChange={(e) => {
                        const passwordbox= document.getElementById('inputPassword5')
                        setPassword(passwordbox ? (passwordbox as HTMLInputElement).value : '')
                    }}
                />
                {/* <Form.Text id="passwordHelpBlock" muted >
                    Your password must be 8-20 characters long, contain letters and numbers,
                    and must not contain spaces, special characters, or emoji.
                </Form.Text> */}
                
                <Form.Control type="submit" value="Register" />
            </Form>
        </Card>
    </div>)
}