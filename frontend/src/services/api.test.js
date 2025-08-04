import { apiService } from './api'

// Mock fetch globally
global.fetch = vi.fn()

describe('ApiService', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    fetch.mockResolvedValue({
      ok: true,
      json: vi.fn().mockResolvedValue({ success: true })
    })
  })

  describe('request method', () => {
    it('makes GET request by default', async () => {
      await apiService.request('/test')
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/test', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    it('makes POST request with JSON body', async () => {
      const data = { name: 'test' }
      
      await apiService.request('/test', {
        method: 'POST',
        body: data
      })
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
    })

    it('handles response errors', async () => {
      fetch.mockResolvedValue({
        ok: false,
        status: 404
      })
      
      await expect(apiService.request('/test')).rejects.toThrow('HTTP error! status: 404')
    })

    it('returns parsed JSON response', async () => {
      const mockData = { id: 1, name: 'test' }
      fetch.mockResolvedValue({
        ok: true,
        json: vi.fn().mockResolvedValue(mockData)
      })
      
      const result = await apiService.request('/test')
      expect(result).toEqual(mockData)
    })
  })

  describe('chat methods', () => {
    it('sends message', async () => {
      await apiService.sendMessage('Hello')
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message: 'Hello' })
      })
    })

    it('gets chat history', async () => {
      await apiService.getChatHistory()
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/chat/history', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    it('clears chat history', async () => {
      await apiService.clearChatHistory()
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/chat/history', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  })

  describe('instructions methods', () => {
    it('gets instructions', async () => {
      await apiService.getInstructions()
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/instructions', {
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })

    it('saves instruction', async () => {
      const instruction = { text: 'Be helpful' }
      
      await apiService.saveInstruction(instruction)
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/instructions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(instruction)
      })
    })

    it('updates instruction', async () => {
      const instruction = { text: 'Updated text' }
      
      await apiService.updateInstruction(123, instruction)
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/instructions/123', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(instruction)
      })
    })

    it('deletes instruction', async () => {
      await apiService.deleteInstruction(123)
      
      expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/instructions/123', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      })
    })
  })
})