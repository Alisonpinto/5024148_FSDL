import { useState, useEffect, useRef } from 'react'
import './App.css'

function PomodoroTimer() {
  const workTime = 25 * 60
  const breakTime = 5 * 60
  const [timeLeft, setTimeLeft] = useState(workTime)
  const [mode, setMode] = useState('work') // 'work' or 'break'
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1)
      }, 1000)
    }
    return () => clearInterval(timerRef.current)
  }, [running])

  useEffect(() => {
    if (timeLeft < 0) {
      if (mode === 'work') {
        setMode('break')
        setTimeLeft(breakTime)
      } else {
        setMode('work')
        setTimeLeft(workTime)
      }
    }
  }, [timeLeft])

  const formatTime = (t) =>
    `${Math.floor(t / 60)
      .toString()
      .padStart(2, '0')}:${(t % 60).toString().padStart(2, '0')}`

  return (
    <div className="pomodoro">
      <h2>{mode === 'work' ? 'Work' : 'Break'} Timer</h2>
      <div className="time">{formatTime(timeLeft)}</div>
      <button onClick={() => setRunning((r) => !r)}>
        {running ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={() => {
          setRunning(false)
          setMode('work')
          setTimeLeft(workTime)
        }}
      >
        Reset
      </button>
    </div>
  )
}

function App() {
  const [todos, setTodos] = useState([])
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, { text: newTodo.trim(), done: false }])
      setNewTodo('')
    }
  }
  const toggleTodo = (index) => {
    const updated = todos.map((t, i) =>
      i === index ? { ...t, done: !t.done } : t
    )
    setTodos(updated)
  }

  return (
    <div className="app">
      <h1>Todo List with Pomodoro</h1>
      <div className="todo">
        <h2>Tasks</h2>
        <div className="input-row">
          <input
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            placeholder="Add new task"
          />
          <button onClick={addTodo}>Add</button>
        </div>
        <ul>
          {todos.map((t, i) => (
            <li key={i} className={t.done ? 'done' : ''}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => toggleTodo(i)}
              />
              {t.text}
            </li>
          ))}
        </ul>
      </div>
      <PomodoroTimer />
    </div>
  )
}

export default App
