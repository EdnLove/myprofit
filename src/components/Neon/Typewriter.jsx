import React, { useState, useEffect } from 'react';

/**
 * TYPEWRITER COMPONENT
 * 模拟打字机效果，循环显示文字
 */
const Typewriter = ({ words, typingSpeed = 150, deletingSpeed = 100, pauseTime = 2000 }) => {
  const [display, setDisplay] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    let timer;

    if (isDeleting) {
      // 删除逻辑
      timer = setTimeout(() => {
        setDisplay(currentWord.substring(0, display.length - 1));
        if (display.length <= 1) {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, deletingSpeed);
    } else {
      // 输入逻辑
      timer = setTimeout(() => {
        setDisplay(currentWord.substring(0, display.length + 1));
        if (display.length === currentWord.length) {
          // 打完了，暂停一会再删除
          setTimeout(() => setIsDeleting(true), pauseTime);
        }
      }, typingSpeed);
    }

    return () => clearTimeout(timer);
  }, [display, isDeleting, wordIndex, words, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="text-gray-400">
      {display}
      <span className="text-[#ccff00] animate-cursor ml-1">|</span>
    </span>
  );
};

export default Typewriter;
