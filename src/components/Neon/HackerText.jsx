import React, { useState, useRef, useEffect, useCallback } from 'react';

/**
 * HACKER TEXT EFFECT COMPONENT
 */
const HackerText = ({ text, className }) => {
  const [displayText, setDisplayText] = useState(text);
  const elementRef = useRef(null);
  const intervalRef = useRef(null);
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

  const startScramble = useCallback(() => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(prev =>
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1/3;
    }, 30);
  }, [text]);

  useEffect(() => {
    // Trigger on mount or intersection
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            startScramble();
          }, 100);
        }
      },
      { threshold: 0.2 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Also trigger if text changes
    startScramble();

    return () => {
      if (elementRef.current) observer.unobserve(elementRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [startScramble, text]);

  return (
    <span
      ref={elementRef}
      onMouseEnter={startScramble}
      className={`${className} cursor-default inline-block`}
    >
      {displayText}
    </span>
  );
};

export default HackerText;
