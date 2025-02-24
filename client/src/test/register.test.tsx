import { render, screen, fireEvent } from '@testing-library/react';
import { RegisterCard } from '../components/RegisterCard';
// this is to mock the window.location.href since that threw an error
window = Object.create(window);
const url = "http://dummy.com";
Object.defineProperty(window, 'location', {
  value: {
    href: url
  },
  writable: true // possibility to override
});

jest.mock('../api/loginRegisterOperation', () => ({
    register: async (username: string, password: string) => {
        if(username && password){
            return true;
        }else
        {
            return false;
        }
    }
}));


describe('RegisterCard', () => {
    test('renders register card', () => {
        render(<RegisterCard />);
        const registerCard = screen.getByText('Register Here');
        expect(registerCard).toBeInTheDocument();
    });


    test('redirects to /todo on successful registration', async () => {
        render(<RegisterCard />);
        const usernameInput = screen.getByLabelText('username');
        const passwordInput = screen.getByLabelText('Password');
        const registerButton = screen.getByText('Register Now');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });
        fireEvent.click(registerButton);

        await screen.findByText('Register Here');
        expect(window.location.href).toBe('/todo');
    });
});
