import React, { useState, useEffect } from 'react';

const LoadingEllipses = () => {
  const [dots, setDots] = useState('...'); // State variable for ellipses animation

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length === 3 ? '' : prevDots + '.'));
    }, 500); // Adjust the interval for your desired animation speed

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
      <div>{dots}</div>
  );
};

export default LoadingEllipses;