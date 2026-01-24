import { useState, useEffect } from 'react'

const DHIKR_OPTIONS = [
  { id: 'subhanallah', text: 'سُبْحَانَ ٱللَّٰهِ', translation: 'SubhanAllah', target: 33 },
  { id: 'alhamdulillah', text: 'ٱلْحَمْدُ لِلَّٰهِ', translation: 'Alhamdulillah', target: 33 },
  { id: 'allahuakbar', text: 'ٱللَّٰهُ أَكْبَرُ', translation: 'Allahu Akbar', target: 34 },
  { id: 'custom', text: 'Custom', translation: 'Custom Dhikr', target: 100 },
]

function App() {
  const [selectedDhikr, setSelectedDhikr] = useState(DHIKR_OPTIONS[0])
  const [count, setCount] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)

  // Load saved state from localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('tasbihState')
    if (savedState) {
      try {
        const { dhikrId, count: savedCount } = JSON.parse(savedState)
        const dhikr = DHIKR_OPTIONS.find(d => d.id === dhikrId) || DHIKR_OPTIONS[0]
        setSelectedDhikr(dhikr)
        setCount(savedCount)
      } catch (e) {
        console.error('Error loading saved state:', e)
      }
    }
  }, [])

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('tasbihState', JSON.stringify({
      dhikrId: selectedDhikr.id,
      count
    }))
  }, [selectedDhikr, count])

  const handleIncrement = () => {
    // Vibrate on mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50)
    }

    const newCount = count + 1
    setCount(newCount)

    // Show completion message when target is reached
    if (newCount === selectedDhikr.target) {
      setShowCompletion(true)
      if (navigator.vibrate) {
        navigator.vibrate([100, 50, 100, 50, 100])
      }
    }
  }

  const handleReset = () => {
    setCount(0)
    setShowCompletion(false)
  }

  const handleDhikrChange = (dhikr) => {
    setSelectedDhikr(dhikr)
    setCount(0)
    setShowCompletion(false)
  }

  const handleContinue = () => {
    setShowCompletion(false)
  }

  return (
    <div className="app">
      <div className="container">
        <header className="header">
          <h1>myTasbih</h1>
          <p>Digital Tasbih Counter</p>
        </header>

        <div className="tasbih-card">
          <div className="dhikr-selector">
            <label>Select Dhikr</label>
            <div className="dhikr-buttons">
              {DHIKR_OPTIONS.map((dhikr) => (
                <button
                  key={dhikr.id}
                  className={`dhikr-btn ${selectedDhikr.id === dhikr.id ? 'active' : ''}`}
                  onClick={() => handleDhikrChange(dhikr)}
                >
                  <span>{dhikr.text}</span>
                  <br />
                  <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>
                    {dhikr.translation}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="counter-section">
            <div className="counter-display">{count}</div>
            <div className="target-count">of {selectedDhikr.target}</div>
            
            <button className="counter-btn" onClick={handleIncrement}>
              TAP
            </button>
          </div>

          <div className="actions">
            <button className="action-btn" onClick={handleReset}>
              <span>🔄</span>
              Reset
            </button>
          </div>
        </div>
      </div>

      {showCompletion && (
        <div className="completion-message">
          <h2>ما شاء الله</h2>
          <p>You've completed {selectedDhikr.target} {selectedDhikr.translation}!</p>
          <button onClick={handleContinue}>Continue</button>
        </div>
      )}
    </div>
  )
}

export default App
