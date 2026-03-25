import { useState, useEffect } from 'react';
import './About.css';

const About = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  // useEffect to simulate API fetch
  useEffect(() => {
    // Simulate API call
    const fetchData = async () => {
      setLoading(true);
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData({
        title: 'About React Demo',
        content: 'This project demonstrates various React concepts including components, props, state, forms, events, routing, refs, keys, and hooks.'
      });
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="about"><p>Loading...</p></div>;
  }

  return (
    <div className="about">
      <h1>{data.title}</h1>
      <p>{data.content}</p>
      <p>This page uses useEffect to fetch data on component mount.</p>
    </div>
  );
};

export default About;