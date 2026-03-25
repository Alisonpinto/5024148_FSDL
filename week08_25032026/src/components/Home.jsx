import { useState } from 'react';
import './Home.css';

const Home = ({ title, description }) => {
  // State for counter
  const [count, setCount] = useState(0);

  // Event handler for button click
  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  return (
    <div className="home">
      <h1>{title}</h1>
      <p>{description}</p>

      <div className="counter">
        <h2>Counter Example (State & Events)</h2>
        <p>Count: {count}</p>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </div>
  );
};

export default Home;