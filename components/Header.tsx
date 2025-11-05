import React from 'react';
import SparklesIcon from './icons/SparklesIcon';

const Header: React.FC = () => {
  return (
    <header className="bg-card shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-center">
        <SparklesIcon className="h-8 w-8 text-primary ml-3" />
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary tracking-tight">
          رفيق المذاكرة الذكي
        </h1>
      </div>
    </header>
  );
};

export default Header;