import { TextEncoder } from 'util';

global.TextEncoder = TextEncoder
import { render } from '@testing-library/react';
import App from '../App';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
describe('App Component', () => {



    // so you can't really test the routes without mocking the login¨
    test('renders login page', () => {
        const { getByText } = render(

            <StrictMode>
   

                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </StrictMode>
        
        );
        const login = getByText('Login');
        expect(login).toBeInTheDocument();
    });

});
