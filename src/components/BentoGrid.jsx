import React from 'react';

export const BentoGrid = ({ className, children }) => {
  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-6 ${className}`}
    >
      {children}
    </div>
  );
};
