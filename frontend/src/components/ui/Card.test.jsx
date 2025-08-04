import { render, screen } from '@testing-library/react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from './Card'

describe('Card Components', () => {
  it('renders Card with children', () => {
    render(
      <Card data-testid="card">
        <div>Card content</div>
      </Card>
    )
    expect(screen.getByTestId('card')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('renders complete Card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card description</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card content goes here</p>
        </CardContent>
        <CardFooter>
          <button>Action</button>
        </CardFooter>
      </Card>
    )

    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card description')).toBeInTheDocument()
    expect(screen.getByText('Card content goes here')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /action/i })).toBeInTheDocument()
  })

  it('applies correct CSS classes', () => {
    render(
      <Card data-testid="card" className="custom-class">
        <CardHeader data-testid="header">
          <CardTitle data-testid="title">Title</CardTitle>
        </CardHeader>
      </Card>
    )

    expect(screen.getByTestId('card')).toHaveClass('rounded-lg', 'border', 'bg-card', 'custom-class')
    expect(screen.getByTestId('header')).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6')
    expect(screen.getByTestId('title')).toHaveClass('text-2xl', 'font-semibold')
  })

  it('forwards refs correctly', () => {
    const cardRef = { current: null }
    const headerRef = { current: null }
    
    render(
      <Card ref={cardRef}>
        <CardHeader ref={headerRef}>
          <CardTitle>Title</CardTitle>
        </CardHeader>
      </Card>
    )

    expect(cardRef.current).toBeInstanceOf(HTMLDivElement)
    expect(headerRef.current).toBeInstanceOf(HTMLDivElement)
  })
})