import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import InstructionForm from './InstructionForm'

// Mock the API service
vi.mock('../services/api', () => ({
  apiService: {
    saveInstruction: vi.fn()
  }
}))

import { apiService } from '../services/api'

describe('InstructionForm', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders form elements', () => {
    render(<InstructionForm />)
    
    expect(screen.getByText('Adicionar Instrução')).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/Digite a instrução para personalizar/)).toBeInTheDocument()
    expect(screen.getByText('Salvar Instrução')).toBeInTheDocument()
  })

  it('saves instruction successfully', async () => {
    const user = userEvent.setup()
    apiService.saveInstruction.mockResolvedValue({})
    
    render(<InstructionForm />)
    
    const textarea = screen.getByRole('textbox')
    const submitButton = screen.getByText('Salvar Instrução')
    
    await user.type(textarea, 'Be helpful and polite')
    await user.click(submitButton)
    
    expect(apiService.saveInstruction).toHaveBeenCalledWith({
      text: 'Be helpful and polite'
    })
    
    await waitFor(() => {
      expect(screen.getByText('Instrução salva com sucesso!')).toBeInTheDocument()
    })
    
    expect(textarea).toHaveValue('')
  })

  it('handles save errors', async () => {
    const user = userEvent.setup()
    apiService.saveInstruction.mockRejectedValue(new Error('Save failed'))
    
    render(<InstructionForm />)
    
    const textarea = screen.getByRole('textbox')
    const submitButton = screen.getByText('Salvar Instrução')
    
    await user.type(textarea, 'Test instruction')
    await user.click(submitButton)
    
    await waitFor(() => {
      expect(screen.getByText('Erro ao salvar instrução!')).toBeInTheDocument()
    })
  })

  it('prevents saving empty instructions', async () => {
    const user = userEvent.setup()
    
    render(<InstructionForm />)
    
    const submitButton = screen.getByText('Salvar Instrução')
    expect(submitButton).toBeDisabled()
    
    const textarea = screen.getByRole('textbox')
    await user.type(textarea, '   ') // Only spaces
    
    expect(submitButton).toBeDisabled()
  })

  it('shows loading state during save', async () => {
    const user = userEvent.setup()
    let resolvePromise
    apiService.saveInstruction.mockImplementation(() => 
      new Promise((resolve) => { resolvePromise = resolve })
    )
    
    render(<InstructionForm />)
    
    const textarea = screen.getByRole('textbox')
    const submitButton = screen.getByText('Salvar Instrução')
    
    await user.type(textarea, 'Test instruction')
    await user.click(submitButton)
    
    expect(screen.getByText('Salvando...')).toBeInTheDocument()
    expect(textarea).toBeDisabled()
    expect(submitButton).toBeDisabled()
    
    resolvePromise({})
    
    await waitFor(() => {
      expect(screen.queryByText('Salvando...')).not.toBeInTheDocument()
    })
  })

  it('submits form when form is submitted', async () => {
    const user = userEvent.setup()
    apiService.saveInstruction.mockResolvedValue({})
    
    render(<InstructionForm />)
    
    const textarea = screen.getByRole('textbox')
    const form = textarea.closest('form')
    
    await user.type(textarea, 'Test instruction')
    
    // Submit the form directly
    await user.submit(form)
    
    await waitFor(() => {
      expect(apiService.saveInstruction).toHaveBeenCalled()
    })
  })
})