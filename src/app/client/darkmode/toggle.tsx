'use client'

import { useState, useEffect } from 'react';

function DarkModeToggle() {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <label htmlFor="dark-mode-toggle" className="flex items-center cursor-pointer">
      <div className="relative">
        <input type="checkbox" id="dark-mode-toggle" className="sr-only" onChange={toggleTheme} checked={theme === 'dark'} />
        <div className="block bg-gray-600 w-14 h-8 rounded-full"></div>
        <div className="dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition"></div>
      </div>
      <div className="ml-3 text-gray-700 dark:text-gray-300 font-medium">Dark Mode</div>
    </label>
  );
}

export default DarkModeToggle;
