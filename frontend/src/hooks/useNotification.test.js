import { renderHook, act } from '@testing-library/react'
import { useNotification } from './useNotification'

describe('useNotification', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('initializes with no notification', () => {
    const { result } = renderHook(() => useNotification())
    
    expect(result.current.notification).toBeNull()
  })

  it('shows notification with message and type', () => {
    const { result } = renderHook(() => useNotification())
    
    act(() => {
      result.current.showNotification('Test message', 'success')
    })
    
    expect(result.current.notification).toEqual({
      message: 'Test message',
      type: 'success'
    })
  })

  it('uses default type "info" when not specified', () => {
    const { result } = renderHook(() => useNotification())
    
    act(() => {
      result.current.showNotification('Test message')
    })
    
    expect(result.current.notification).toEqual({
      message: 'Test message',
      type: 'info'
    })
  })

  it('auto-hides notification after 3 seconds', () => {
    const { result } = renderHook(() => useNotification())
    
    act(() => {
      result.current.showNotification('Test message')
    })
    
    expect(result.current.notification).toBeTruthy()
    
    act(() => {
      vi.advanceTimersByTime(3000)
    })
    
    expect(result.current.notification).toBeNull()
  })

  it('can manually hide notification', () => {
    const { result } = renderHook(() => useNotification())
    
    act(() => {
      result.current.showNotification('Test message')
    })
    
    expect(result.current.notification).toBeTruthy()
    
    act(() => {
      result.current.hideNotification()
    })
    
    expect(result.current.notification).toBeNull()
  })

  it('resets timer when showing new notification', () => {
    const { result } = renderHook(() => useNotification())
    
    act(() => {
      result.current.showNotification('First message')
    })
    
    act(() => {
      vi.advanceTimersByTime(2000) // 2 seconds
    })
    
    act(() => {
      result.current.showNotification('Second message')
    })
    
    // Should still be showing the second message after 2 more seconds
    act(() => {
      vi.advanceTimersByTime(2900) // Just under 3 seconds to ensure it's still showing
    })
    
    expect(result.current.notification).toEqual({
      message: 'Second message',
      type: 'info'
    })
    
    // Should hide after full 3 seconds from second message
    act(() => {
      vi.advanceTimersByTime(200) // Complete the 3 seconds
    })
    
    expect(result.current.notification).toBeNull()
  })
})