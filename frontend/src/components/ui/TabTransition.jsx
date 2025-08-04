import { useState, useEffect } from 'react'

const TabTransition = ({ activeTab, children }) => {
  const [displayTab, setDisplayTab] = useState(activeTab)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (activeTab !== displayTab) {
      setIsTransitioning(true)
      
      // Small delay to allow fade out
      setTimeout(() => {
        setDisplayTab(activeTab)
        setIsTransitioning(false)
      }, 150)
    }
  }, [activeTab, displayTab])

  return (
    <div className={`transition-all duration-300 ${
      isTransitioning ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'
    }`}>
      {children}
    </div>
  )
}

export { TabTransition }