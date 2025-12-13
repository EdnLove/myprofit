import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const TypewriterText = ({ text, delay = 0 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const textRef = useRef(text); // Track current text prop

  useEffect(() => {
    // Immediate update of ref
    textRef.current = text;
    setDisplayedText('');

    let index = 0;
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        // Double check we are still typing the correct text
        if (textRef.current !== text) {
             clearInterval(interval);
             return;
        }

        if (index < text.length) {
            setDisplayedText((prev) => text.substring(0, index + 1));
            index++;
        } else {
            clearInterval(interval);
        }
      }, 40); // Slightly faster typing

      return () => clearInterval(interval);
    }, delay * 1000);

    return () => {
      clearTimeout(timeout);
    };
  }, [text, delay]);

  return (
    <motion.span
      initial={{ opacity: 1 }}
      className="font-mono text-[#2997ff] dark:text-[#2997ff]"
    >
      {displayedText}
      <motion.span
        animate={{ opacity: [0, 1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8 }}
        className="inline-block w-2 h-4 bg-[#2997ff] ml-1 translate-y-1"
      />
    </motion.span>
  );
};

export default TypewriterText;
