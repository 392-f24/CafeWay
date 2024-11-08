import {describe, expect, test} from 'vitest';
import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';

describe('launching', () => {
  it('should show all the headings', async () => {
    render(<App />);
    await screen.findByText(/CafeWay/);
    await screen.findByText(/Update Cafe Availability/);
    await screen.findByText(/Availability History/);
    await screen.findByText(/Cafes Near Me/);
  });
});


describe('authenticating', () => {
  it('show sign in/sign out button', async () => {
    render(<App />);
    await screen.findByText(/Sign In/) || await screen.findByText(/Sign Out/);
  });
});

