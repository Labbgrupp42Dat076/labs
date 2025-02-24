
import axios from 'axios'
import { LoginCard } from '../../components/LoginCard';
import { RegisterCard } from '../../components/RegisterCard';
import { useEffect, useState } from 'react'
axios.defaults.withCredentials = true;
import { testIfLogin } from '../../api/loginRegisterOperation';



const LoginPage: React.FC = () => {


    useEffect(() => {
        // logs you in if you are already logged in
        testIfLogin();
    }, [])
    

    return (
        <div className="loginPage">
            {
            }
            <LoginCard>
            </LoginCard>
            <RegisterCard>
            </RegisterCard>


        </div>
    )
}


export default LoginPage

