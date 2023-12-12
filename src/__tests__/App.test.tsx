import { render, screen, act } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import App from '../App';
import SpaceTraders from '../SpaceTraders';

jest.mock('../SpaceTraders', () => ({
    __esModule: true,  // This is required for ES modules
    default: {
        getUser: jest.fn(),
        getFleet: jest.fn(),
        // Add other methods you are using in your component
    },
}));

describe('App Component', () => {
    beforeEach(() => {
        // Reset mocks before each test
        jest.resetAllMocks();
    });

    test('renders Sidebar and Outlet', async () => {
        const mockUser = { username: 'testUser' };
        const mockFleet = { shipCount: 1 };

        (SpaceTraders.getUser as jest.Mock).mockResolvedValueOnce(mockUser);
        (SpaceTraders.getFleet as jest.Mock).mockResolvedValueOnce(mockFleet);

        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<App />} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Ensure Sidebar is rendered with user and fleet data
        expect(screen.getByText(/testUser/i)).toBeInTheDocument();
        expect(screen.getByText(/Ship Count: 1/i)).toBeInTheDocument();

        // Ensure Outlet is present
        expect(screen.getByTestId('outlet')).toBeInTheDocument();
    });

    test('redirect to login if no token', async () => {
        SpaceTraders.token = null;

        await act(async () => {
            render(
                <MemoryRouter initialEntries={['/']}>
                    <Routes>
                        <Route path="/" element={<App />} />
                        <Route path="/login" element={<div data-testid="login-page">Login Page</div>} />
                    </Routes>
                </MemoryRouter>
            );
        });

        // Ensure redirection to /login
        expect(screen.getByTestId('login-page')).toBeInTheDocument();
    });
});
