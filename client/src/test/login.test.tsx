import { render, fireEvent, waitFor } from '@testing-library/react';
import { LoginCard } from '../components/LoginCard';


// this is to mock the window.location.href since that threw an error
window = Object.create(window);
const url = "http://dummy.com";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  },
  writable: true // possibility to override
});


// mock the login function
jest.mock('../api/loginRegisterOperation', () => ({
    login: async (username: string, password: string) => {
        if(username === 'admin' && password === 'admin'){
            window.location.href = '/todo';
            return true;
        }else
        {
            return false;
        }
    }
}));

test('renders login form', () => {
    const { getByLabelText, getByText } = render(<LoginCard />);
    
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Log In');
    
    expect(usernameInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
});

test('submits login form', async () => {
    const { getByLabelText, getByText } = render(<LoginCard />);
    
    const usernameInput = getByLabelText('Username');
    const passwordInput = getByLabelText('Password');
    const loginButton = getByText('Log In');
    
    fireEvent.change(usernameInput, { target: { value: 'admin' } });
    fireEvent.change(passwordInput, { target: { value: 'admin' } });
    fireEvent.click(loginButton);
    
    await waitFor(() => {


        // wait to be redirected to /todo
        expect(window.location.href).toBe('/todo');


    });
});
