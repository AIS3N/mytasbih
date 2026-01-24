import { useState, useEffect, useCallback, useRef } from 'react'

function App() {
  const [count, setCount] = useState(0)
  const [targetCount, setTargetCount] = useState('')
  const [showCompletion, setShowCompletion] = useState(false)
  const [previousCount, setPreviousCount] = useState(null)
  const saveTimeoutRef = useRef(null)

  useEffect(() => {
    const savedState = localStorage.getItem('tasbihState')
    if (savedState) {
      try {
        const { count: savedCount, target: savedTarget } = JSON.parse(savedState)
        setCount(savedCount)
        setTargetCount(savedTarget || '')
      } catch (e) {
        console.error('Error loading saved state:', e)
      }
    }
  }, [])

  // Debounced save to localStorage
  useEffect(() => {
    if (saveTimeoutRef.current) {
      clearTimeout(saveTimeoutRef.current)
    }
    
    saveTimeoutRef.current = setTimeout(() => {
      localStorage.setItem('tasbihState', JSON.stringify({
        count,
        target: targetCount
      }))
    }, 300)

    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current)
      }
    }
  }, [count, targetCount])

  const handleIncrement = useCallback(() => {
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    // Clear previous count if user starts tapping again after reset
    if (previousCount !== null) {
      setPreviousCount(null)
    }

    setCount(prevCount => {
      const newCount = prevCount + 1
      
      const target = parseInt(targetCount)
      if (target > 0 && newCount === target) {
        setShowCompletion(true)
        if (navigator.vibrate) {
          navigator.vibrate([100, 50, 100, 50, 100])
        }
      }
      
      return newCount
    })
  }, [targetCount, previousCount])

  const handleReset = useCallback(() => {
    setCount(prevCount => {
      setPreviousCount(prevCount)
      return 0
    })
    setShowCompletion(false)
  }, [])

  const handleUndo = useCallback(() => {
    if (previousCount !== null) {
      setCount(previousCount)
      setPreviousCount(null)
    }
  }, [previousCount])

  const handleContinue = useCallback(() => {
    setShowCompletion(false)
  }, [])

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>myTasbih</h1>
          <p>100% Free & Ad-Free Digital Tasbih Counter</p>
        </header>

        <div className="tasbih-card">
          <div className="goal-section">
            <label htmlFor="target-input">Set Your Goal</label>
            <input
              id="target-input"
              type="number"
              min="1"
              placeholder="Enter target count"
              value={targetCount}
              onChange={(e) => setTargetCount(e.target.value)}
              className="goal-input"
            />
          </div>

          <div className="counter-section">
            <div className="counter-display">{count}</div>
            {targetCount && <div className="target-count">of {targetCount}</div>}
            
            <button className="counter-btn" onClick={handleIncrement}>
              TAP
            </button>
          </div>

          <div className="actions">
            {previousCount !== null && (
              <button className="action-btn undo-btn" onClick={handleUndo}>
                Cancel reset
              </button>
            )}
            <button className="action-btn" onClick={handleReset}>
              Reset
            </button>
          </div>
        </div>
        
        <footer className="footer">
          <p>✨ No Ads • No Tracking • 100% Free Forever ✨</p>
        </footer>
      </div>

      {showCompletion && (
        <div className="completion-message">
          <p>You've achieved your goal of {targetCount}!</p>
          <div className="completion-actions">
            <button className="reset-btn-alt" onClick={handleReset}>Reset</button>
            <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
