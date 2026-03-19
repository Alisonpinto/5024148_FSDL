import { useState, useEffect } from 'react'

function Pomodoro() {
  const [time, setTime] = useState(25 * 60) // 25 minutes in seconds
  const [isActive, setIsActive] = useState(false)
  const [isBreak, setIsBreak] = useState(false)

  useEffect(() => {
    let interval = null

    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time - 1)
      }, 1000)
    } else if (time === 0) {
      // Switch between work and break
      if (isBreak) {
        setTime(25 * 60) // Back to work
        setIsBreak(false)
      } else {
        setTime(5 * 60) // Break time
        setIsBreak(true)
      }
      setIsActive(false)
    }

    return () => clearInterval(interval)
  }, [isActive, time, isBreak])

  const handleStartPause = () => {
    setIsActive(!isActive)
  }

  const handleReset = () => {
    setIsActive(false)
    setTime(25 * 60)
    setIsBreak(false)
  }

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="pomodoro-container">
      <h2>{isBreak ? '🍵 Break Time' : '🍅 Pomodoro Timer'}</h2>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="button-group">
        <button 
          className="btn btn-primary" 
          onClick={handleStartPause}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          className="btn btn-secondary" 
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
      <p className="timer-info">
        {isBreak ? 'Take a break!' : 'Focus on your work'}
      </p>
    </div>
  )
}

export default Pomodoro
