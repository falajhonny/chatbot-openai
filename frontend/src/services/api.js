const API_BASE_URL = 'http://localhost:3001/api'

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    const response = await fetch(url, config)
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    return response.json()
  }

  // Chat methods
  async sendMessage(message) {
    return this.request('/chat', {
      method: 'POST',
      body: { message }
    })
  }

  async getChatHistory() {
    return this.request('/chat/history')
  }

  async clearChatHistory() {
    return this.request('/chat/history', {
      method: 'DELETE'
    })
  }

  // Instructions methods
  async getInstructions() {
    return this.request('/instructions')
  }

  async saveInstruction(instruction) {
    return this.request('/instructions', {
      method: 'POST',
      body: instruction
    })
  }

  async updateInstruction(id, instruction) {
    return this.request(`/instructions/${id}`, {
      method: 'PUT',
      body: instruction
    })
  }

  async deleteInstruction(id) {
    return this.request(`/instructions/${id}`, {
      method: 'DELETE'
    })
  }
}

export const apiService = new ApiService()