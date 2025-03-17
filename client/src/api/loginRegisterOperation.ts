import { AxiosError } from "axios"
import axiosInstance from "./axiosInstance"


/**
 * Logs in a user with the provided username and password.
 * 
 * @param username - The username of the user attempting to log in.
 * @param password - The password of the user attempting to log in.
 * @returns A promise that resolves to a boolean indicating whether the login was successful.
 * 
 * @remarks
 * If the login is successful, the username is stored in localStorage.
 * If the login fails, an error is logged to the console and an alert is shown to the user.
 * 
 * @throws Will throw an error if the HTTP request fails.
 */
export async function login(username: string, password:string): Promise<boolean> {

    //logs you in for now
    try {
       await axiosInstance.post('/user/login', {
            name: username,
            password: password
        })
    } catch (e:any) {
        console.error(e)
        if(e.code === "ERR_NETWORK") {
            window.location.href = '/error/500'
            return false
        }
        alert("Invalid username or password")
        return false
    }
    
    localStorage.setItem('username', username)
    return true
}


/**
 * Sends a GET request to the specified endpoint to test if the user is logged in.
 * If the response status is 200, it redirects the user to the '/todo' page.
 * Logs the response to the console.
 *
 * @returns {void}
 */
export function testIfLogin(): void {
    axiosInstance.get('/note')
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.href = '/todo';
            }
        });
  
}


/**
 * Registers a new user with the provided username and password.
 * 
 * @param username - The username of the new user.
 * @param password - The password of the new user.
 * @returns A promise that resolves to a boolean indicating whether the registration was successful.
 * 
 * @remarks
 * This function sends a POST request to the server to register a new user. If the registration is successful,
 * the username is stored in local storage. If the registration fails due to the user already existing, an alert
 * is shown and the function returns false. If the registration fails due to other reasons, an alert is shown
 * and the function returns false.
 * 
 * @throws AxiosError - Throws an error if the request fails for any reason other than a 400 status code.
 */
export async function register(username:string, password:string): Promise<boolean> {
    try {
        await axiosInstance.post('/user/register', {
            name: username,
            password: password
        })
    } catch (e) {
        console.error(e)
        const axioserror: AxiosError = e as AxiosError
        
        if (axioserror.response?.status === 400){
            alert("user already exists")
            return false
        } else{
            alert("Invalid username or password")
            return false
        }
    }
    localStorage.setItem('username', username)
    return true
}


/**
 * Logs out the current user by making a POST request to the logout endpoint.
 * After a successful logout, it redirects the user to the home page and clears the username from local storage.
 * 
 * @returns {Promise<void>} A promise that resolves when the logout operation is complete.
 */
export async function logout(): Promise<void> {
    await axiosInstance.post('/user/logout')
    window.location.href = '/'
    localStorage.setItem('username',"")
}
