import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders the Turing Machine Simulator heading', () => {
    render(<App />)
    const heading = screen.getByText(/turing machine simulator/i)
    expect(heading).toBeInTheDocument()
  })
})
