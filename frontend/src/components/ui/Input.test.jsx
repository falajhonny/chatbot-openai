import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Input } from './Input'

describe('Input', () => {
  it('renders with placeholder', () => {
    render(<Input placeholder="Enter text..." />)
    expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument()
  })

  it('handles value changes', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()
    
    render(<Input onChange={handleChange} />)
    const input = screen.getByRole('textbox')
    
    await user.type(input, 'Hello')
    expect(handleChange).toHaveBeenCalledTimes(5) // Once per character
  })

  it('can be controlled', () => {
    const { rerender } = render(<Input value="initial" readOnly />)
    expect(screen.getByDisplayValue('initial')).toBeInTheDocument()
    
    rerender(<Input value="updated" readOnly />)
    expect(screen.getByDisplayValue('updated')).toBeInTheDocument()
  })

  it('supports different input types', () => {
    const { rerender } = render(<Input type="password" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'password')
    
    rerender(<Input type="email" />)
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'email')
  })

  it('can be disabled', () => {
    render(<Input disabled />)
    expect(screen.getByRole('textbox')).toBeDisabled()
  })

  it('forwards ref correctly', () => {
    const ref = { current: null }
    render(<Input ref={ref} />)
    expect(ref.current).toBeInstanceOf(HTMLInputElement)
  })

  it('applies custom className', () => {
    render(<Input className="custom-class" data-testid="input" />)
    expect(screen.getByTestId('input')).toHaveClass('custom-class')
  })
})