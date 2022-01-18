import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('timer begins at 0', () => {
  render(<App />);
  const timer = screen.getByText(/0/);
  expect(timer).toBeInTheDocument();
});

test('renders start button', () => {
  render(<App />);
  const startBtn = screen.getByText(/start/i);
  expect(startBtn).toBeInTheDocument();
});

test('renders pause button', () => {
  render(<App />);
  const pauseBtn = screen.getByText(/pause/i);
  expect(pauseBtn).toBeInTheDocument();
});

test('renders reset button', () => {
  render(<App />);
  const resetBtn = screen.getByText(/reset/i);
  expect(resetBtn).toBeInTheDocument();
});

test('counter begins on start press', async () => {
  // ESLint doesn't like act being here, but it solves Jest errors
  // Not sure where to put it
  // Solution: turned no-unnecessary-act strict mode off
  await act(async () => {
    render(<App />);
    const startBtn = screen.getByText(/start/i);
    fireEvent.click(startBtn);

    // Just sets a timer to wait for 1.5 seconds
    await new Promise((res) => setTimeout(() => res('done'), 1500));
    const counter = await waitFor(() => screen.findByRole('timer'));
    expect(counter).toHaveTextContent('1');
  });
});
