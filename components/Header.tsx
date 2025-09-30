
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="py-8 text-center">
      <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
        Study Monitor
      </h1>
      <p className="text-slate-400 mt-2">Your Personal Dashboard for Academic Success</p>
    </header>
  );
};

export default Header;
