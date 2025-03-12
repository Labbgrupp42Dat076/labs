import { AxiosError } from "axios"
import axiosInstance from "./axiosInstance"

export async function login(username: string, password:string): Promise<boolean> {

    //logs you in for now
    try {
       await axiosInstance.post('/user/login', {
            name: username,
            password: password
        })
    } catch (e) {
        console.error(e)
        alert("Invalid username or password")
        return false
    }
    localStorage.setItem('username', username)
    return true


}


export function testIfLogin() {
    axiosInstance.get('/note')
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.href = '/todo';
            }

        });
}


export async function register(username:string, password:string): Promise<boolean> {
        
        try{
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
        }else{
            alert("Invalid username or password")
            return false
        }

      
    }
    localStorage.setItem('username', username)
    return true
}

export async function logout() {
    await axiosInstance.post('/user/logout')
    window.location.href = '/'
    localStorage.setItem('username',"")
}