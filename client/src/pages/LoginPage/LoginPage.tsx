import { LoginCard } from '../../components/LoginCard';
import { RegisterCard } from '../../components/RegisterCard';
import { useEffect, useState } from 'react'
import { testIfLogin } from '../../api/loginRegisterOperation';
import './LoginPage.css'


/**
 * The `LoginPage` component is a React functional component that represents the login page of the application.
 * 
 * This component uses the `useEffect` hook to check if the user is already logged in when the component is mounted.
 * If the user is already logged in, the `testIfLogin` function is called to handle the login state.
 * 
 * The component renders a `LoginCard` and a `RegisterCard` component within a `div` with the class name "loginPage".
 * 
 * @component
 * @example
 * <LoginPage />
 * 
 */
const LoginPage: React.FC = () => {
    useEffect(() => { // logs you in if you are already logged in
        testIfLogin();
    }, [])

    const [ showLoin, setShowLogin ] = useState(true)
    
    return (
        <div className="loginPage">
            {showLoin? 
                <LoginCard />
                :
                <RegisterCard />
            }

            {showLoin? 
                <p className="loginPage__toggle">
                    Don't have an account?
                    <span onClick={()=>setShowLogin(!showLoin)}> Register
                    </span>
                </p> : 
                <p className="loginPage__toggle">
                    Already have an account? 
                    <span onClick={()=>setShowLogin(!showLoin)}>
                        Login
                    </span>
                </p>
            }

        </div>
    )
}

export default LoginPage
