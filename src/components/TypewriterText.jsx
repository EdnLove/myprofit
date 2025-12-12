import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    // Reset state when text changes
    setDisplayedText('');

    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayedText((prev) => {
           // Ensure we don't exceed text length
           if (prev.length >= text.length) return prev;
           return prev + text.charAt(prev.length);
        });
        index++;
        if (index >= text.length) clearInterval(interval);
      }, 50); // Speed of typing

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <motion.span
      initial={{ opacity: 1 }}
      className="font-mono text-blue-400"
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-4 bg-blue-400 ml-1 translate-y-1"
      />
    </motion.span>
  );
};

export default TypewriterText;
