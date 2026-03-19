import { useState } from 'react'

function TodoList() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const addTodo = () => {
    if (inputValue.trim() === '') return

    const newTodo = {
      id: Date.now(),
      text: inputValue,
      completed: false
    }

    setTodos([...todos, newTodo])
    setInputValue('')
  }

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo()
    }
  }

  const completedCount = todos.filter(todo => todo.completed).length

  return (
    <div className="todo-container">
      <h2>✓ Todo List</h2>
      <div className="todo-progress">
        {todos.length > 0 && (
          <p className="progress-text">
            {completedCount} of {todos.length} completed
          </p>
        )}
      </div>
      
      <div className="todo-input-group">
        <input
          type="text"
          className="todo-input"
          placeholder="Add a new task..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="btn btn-primary" onClick={addTodo}>
          Add
        </button>
      </div>

      <div className="todo-list">
        {todos.length === 0 ? (
          <p className="empty-message">No tasks yet. Add one to get started!</p>
        ) : (
          todos.map(todo => (
            <div key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className={`todo-text ${todo.completed ? 'completed' : ''}`}>
                {todo.text}
              </span>
              <button
                className="btn-delete"
                onClick={() => deleteTodo(todo.id)}
              >
                ✕
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default TodoList
