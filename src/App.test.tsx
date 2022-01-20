import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import { act } from 'react-dom/test-utils';

test('timer begins at 0', () => {
  render(<App />);
  const timer = screen.getByText(/0/);
  expect(timer).toBeInTheDocument();
});

test('renders start button on page load', () => {
  render(<App />);
  const startBtn = screen.getByTestId('start-btn');
  expect(startBtn).toBeInTheDocument();
});

test('does not render pause button before timer start', () => {
  render(<App />);
  const pauseBtn = screen.queryByTestId('pause-btn');
  expect(pauseBtn).not.toBeInTheDocument();
});

test('renders pause btn after start btn is clicked', async () => {
  render(<App />);

  const startBtn = screen.getByTestId('start-btn');
  expect(startBtn).toBeInTheDocument();
  fireEvent.click(startBtn);

  const pauseBtn = screen.getByTestId('pause-btn');
  expect(pauseBtn).toBeInTheDocument();
  fireEvent.click(pauseBtn);
});

test('renders reset button', () => {
  render(<App />);
  const resetBtn = screen.getByTestId('reset-btn');
  expect(resetBtn).toBeInTheDocument();
});

test('counter begins on start press', async () => {
  jest.useFakeTimers();
  render(<App />);
  const startBtn = screen.getByTestId('start-btn');
  fireEvent.click(startBtn);

  act(() => {
    jest.advanceTimersByTime(1500);
  });
  const counter = await waitFor(() => screen.findByRole('timer'));
  expect(counter).toHaveTextContent('1');
});

test('pause button pauses count', async () => {
  jest.useFakeTimers();
  render(<App />);

  const startBtn = screen.getByTestId('start-btn');
  expect(startBtn).toBeInTheDocument();
  fireEvent.click(startBtn);

  act(() => {
    jest.advanceTimersByTime(2500);
  });

  const pauseBtn = screen.getByTestId('pause-btn');
  expect(pauseBtn).toBeInTheDocument();
  fireEvent.click(pauseBtn);

  const counter = await waitFor(() => screen.findByRole('timer'));
  expect(counter).toHaveTextContent('2');
});

test('reset button sets counter to 0', async () => {
  render(<App />);
  const resetBtn = screen.getByTestId('reset-btn');
  fireEvent.click(resetBtn);
  const counter = await waitFor(() => screen.findByRole('timer'));
  expect(counter).toHaveTextContent('0');
});

test('rolls over to 1 minute on 60 seconds', async () => {
  jest.useFakeTimers();
  render(<App />);
  const startBtn = screen.getByTestId('start-btn');
  fireEvent.click(startBtn);

  act(() => {
    jest.advanceTimersByTime(60500);
  });
  const counter = await waitFor(() => screen.findByRole('timer'));
  expect(counter).toHaveTextContent('1:00');
});
