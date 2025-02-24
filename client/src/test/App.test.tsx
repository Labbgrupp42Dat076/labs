
import { render } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {

    test('renders App component', () => {
        render(<App />);
    });
  
    // the app component is a router so it will render the login page unless you are logged in
    // so you can't really test the routes without mocking the login¨
    test('renders login page', () => {
        const { getByText } = render(<App />);
        const login = getByText('Login');
        expect(login).toBeInTheDocument();
    });

});
