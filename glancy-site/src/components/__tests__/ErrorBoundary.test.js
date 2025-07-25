/** @jest-environment jsdom */
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { jest } from '@jest/globals'
import ErrorBoundary from '../ErrorBoundary.jsx'
import React from 'react'

function ProblemChild() {
  throw new Error('boom')
}

beforeEach(() => {
  jest.spyOn(console, 'error').mockImplementation(() => {})
})

afterEach(() => {
  console.error.mockRestore()
})

test('displays fallback UI on error', () => {
  render(
    React.createElement(
      ErrorBoundary,
      { fallback: React.createElement('div', null, 'Fallback') },
      React.createElement(ProblemChild)
    )
  )
  expect(screen.getByText('Fallback')).toBeInTheDocument()
})
