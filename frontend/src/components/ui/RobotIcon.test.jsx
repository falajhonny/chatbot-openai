import { render, screen } from '@testing-library/react'
import { RobotIcon } from './RobotIcon'

describe('RobotIcon', () => {
  it('renders SVG icon', () => {
    render(<RobotIcon data-testid="robot-icon" />)
    const icon = screen.getByTestId('robot-icon')
    expect(icon).toBeInTheDocument()
    expect(icon.tagName).toBe('svg')
  })

  it('uses default size of 24', () => {
    render(<RobotIcon data-testid="robot-icon" />)
    const icon = screen.getByTestId('robot-icon')
    expect(icon).toHaveAttribute('width', '24')
    expect(icon).toHaveAttribute('height', '24')
  })

  it('accepts custom size', () => {
    render(<RobotIcon size={32} data-testid="robot-icon" />)
    const icon = screen.getByTestId('robot-icon')
    expect(icon).toHaveAttribute('width', '32')
    expect(icon).toHaveAttribute('height', '32')
  })

  it('applies custom className', () => {
    render(<RobotIcon className="custom-color" data-testid="robot-icon" />)
    const icon = screen.getByTestId('robot-icon')
    expect(icon).toHaveClass('custom-color', 'text-primary')
  })

  it('has correct viewBox', () => {
    render(<RobotIcon data-testid="robot-icon" />)
    const icon = screen.getByTestId('robot-icon')
    expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
  })

  it('passes through additional props', () => {
    render(<RobotIcon aria-label="Robot assistant" data-testid="robot-icon" />)
    const icon = screen.getByTestId('robot-icon')
    expect(icon).toHaveAttribute('aria-label', 'Robot assistant')
  })
})