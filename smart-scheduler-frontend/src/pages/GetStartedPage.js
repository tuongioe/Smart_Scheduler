import React, { useState, useEffect } from 'react';
import './User.css';
import { Link } from 'react-router-dom';

function GetStartedPage() {
  const [content, setContent] = useState(0);
  const contents = [
    'Welcome to Smart Scheduler',
    'Plan Your Day Efficiently',
    'Stay Organized with Us'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setContent(prevContent => (prevContent + 1) % contents.length);
    }, 1130);

    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 3000);

    return () => {
      clearInterval(interval); // Cleanup interval on component unmount
      clearTimeout(timeout);   // Cleanup timeout on component unmount
    };
  }, [contents.length]);

  return (
    <div className="get-started-page">
      <h1>{contents[content]}</h1>
      <Link to="/survey"><button className="welcome__btn">Get Started</button></Link>
    </div>
  );
}

export default GetStartedPage;
