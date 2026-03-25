import { useState } from 'react';
import './List.css';

const List = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', completed: false },
    { id: 2, name: 'Item 2', completed: true },
    { id: 3, name: 'Item 3', completed: false },
    { id: 4, name: 'Item 4', completed: false },
    { id: 5, name: 'Item 5', completed: true }
  ]);

  // Toggle completion
  const toggleComplete = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, completed: !item.completed } : item
    ));
  };

  // Add new item
  const [newItem, setNewItem] = useState('');
  const addItem = () => {
    if (newItem.trim()) {
      const newId = Math.max(...items.map(item => item.id)) + 1;
      setItems([...items, { id: newId, name: newItem, completed: false }]);
      setNewItem('');
    }
  };

  return (
    <div className="list-container">
      <h1>List Example</h1>
      <p>This demonstrates rendering lists with keys and state management.</p>

      <div className="add-item">
        <input
          type="text"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          placeholder="Add new item"
          onKeyPress={(e) => e.key === 'Enter' && addItem()}
        />
        <button onClick={addItem}>Add</button>
      </div>

      <ul className="item-list">
        {items.map(item => (
          <li key={item.id} className={`item ${item.completed ? 'completed' : ''}`}>
            <span onClick={() => toggleComplete(item.id)} style={{ cursor: 'pointer' }}>
              {item.name}
            </span>
            <button onClick={() => toggleComplete(item.id)} className="toggle-btn">
              {item.completed ? 'Undo' : 'Complete'}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default List;