
import axios from 'axios'
import { LoginCard } from '../../components/LoginCard';
import { RegisterCard } from '../../components/RegisterCard';
import { useEffect, useState } from 'react'
axios.defaults.withCredentials = true;



const LoginPage: React.FC = () => {


    useEffect(() => {
        axios.get('http://localhost:8080/note')
        .then((res) => {
            console.log(res)
            if (res.status === 200) {
                window.location.href = '/todo'
            }
            
        })
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