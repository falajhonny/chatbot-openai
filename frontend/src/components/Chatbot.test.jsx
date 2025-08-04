import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Chatbot from './Chatbot'

// Mock the API service
vi.mock('../services/api', () => ({
  apiService: {
    sendMessage: vi.fn()
  }
}))

import { apiService } from '../services/api'

describe('Chatbot', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders chat interface', () => {
    render(<Chatbot />)
    
    expect(screen.getByText('Chat com IA')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Digite sua pergunta...')).toBeInTheDocument()
    expect(screen.getByText('Comece uma conversa digitando uma mensagem abaixo')).toBeInTheDocument()
  })

  it('sends message and displays response', async () => {
    const user = userEvent.setup()
    apiService.sendMessage.mockResolvedValue({ response: 'Hello from bot!' })
    
    render(<Chatbot />)
    
    const input = screen.getByPlaceholderText('Digite sua pergunta...')
    const sendButton = screen.getByRole('button')
    
    await user.type(input, 'Hello')
    await user.click(sendButton)
    
    // Check user message appears
    expect(screen.getByText('Hello')).toBeInTheDocument()
    
    // Wait for bot response
    await waitFor(() => {
      expect(screen.getByText('Hello from bot!')).toBeInTheDocument()
    })
    
    expect(apiService.sendMessage).toHaveBeenCalledWith('Hello')
  })

  it('handles API errors gracefully', async () => {
    const user = userEvent.setup()
    apiService.sendMessage.mockRejectedValue(new Error('API Error'))
    
    render(<Chatbot />)
    
    const input = screen.getByPlaceholderText('Digite sua pergunta...')
    const sendButton = screen.getByRole('button')
    
    await user.type(input, 'Test message')
    await user.click(sendButton)
    
    await waitFor(() => {
      expect(screen.getByText('Erro na resposta. Tente novamente mais tarde.')).toBeInTheDocument()
    })
  })

  it('prevents sending empty messages', async () => {
    const user = userEvent.setup()
    
    render(<Chatbot />)
    
    const sendButton = screen.getByRole('button')
    expect(sendButton).toBeDisabled()
    
    const input = screen.getByPlaceholderText('Digite sua pergunta...')
    await user.type(input, '   ') // Only spaces
    
    expect(sendButton).toBeDisabled()
  })

  it('clears input after sending message', async () => {
    const user = userEvent.setup()
    apiService.sendMessage.mockResolvedValue({ response: 'Response' })
    
    render(<Chatbot />)
    
    const input = screen.getByPlaceholderText('Digite sua pergunta...')
    const sendButton = screen.getByRole('button')
    
    await user.type(input, 'Test message')
    expect(input).toHaveValue('Test message')
    
    await user.click(sendButton)
    
    await waitFor(() => {
      expect(input).toHaveValue('')
    })
  })

  it('displays loading state', async () => {
    const user = userEvent.setup()
    let resolvePromise
    apiService.sendMessage.mockImplementation(() => 
      new Promise((resolve) => { resolvePromise = resolve })
    )
    
    render(<Chatbot />)
    
    const input = screen.getByPlaceholderText('Digite sua pergunta...')
    const sendButton = screen.getByRole('button')
    
    await user.type(input, 'Test')
    await user.click(sendButton)
    
    expect(screen.getByText('Digitando...')).toBeInTheDocument()
    expect(sendButton).toBeDisabled()
    
    resolvePromise({ response: 'Done' })
    
    await waitFor(() => {
      expect(screen.queryByText('Digitando...')).not.toBeInTheDocument()
    })
  })
})