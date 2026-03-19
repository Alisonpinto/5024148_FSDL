import './App.css'
import Pomodoro from './Pomodoro'
import TodoList from './TodoList'

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>⏲️ Pomodoro & Todo</h1>
        <p className="subtitle">Stay focused, stay productive</p>
      </header>
      
      <main className="app-main">
        <Pomodoro />
        <TodoList />
      </main>
    </div>
  )
}

export default App
