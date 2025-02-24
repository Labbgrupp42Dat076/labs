import axios, { AxiosError } from "axios"

export async function login(username: string, password:string): Promise<boolean> {

    //logs you in for now
    try {
       await axios.post('http://localhost:8080/user/login', {
            name: username,
            password: password
        })
    } catch (e) {
        console.error(e)
        alert("Invalid username or password")
        return false
    }
    return true

}


export function testIfLogin() {
    axios.get('http://localhost:8080/note')
        .then((res) => {
            console.log(res);
            if (res.status === 200) {
                window.location.href = '/todo';
            }

        });
}


export async function register(username:string, password:string): Promise<boolean> {
        
        try{
        await axios.post('http://localhost:8080/user/register', {
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
    return true
}