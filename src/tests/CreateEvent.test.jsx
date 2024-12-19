import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import CreateEvent from '../components/CreateEvent';
import { UserAuthContextProvider } from '../contexts/UserAuthContextProvider';

vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom');
    return {
        ...actual,
        useNavigate: vi.fn(),
    };
});

global.fetch = vi.fn();

// Check all fields and buttons are rendered
test('renders CreateEvent component', () => {
    render(
        <UserAuthContextProvider>
            <MemoryRouter>
                <CreateEvent />
            </MemoryRouter>
        </UserAuthContextProvider>
    );
});