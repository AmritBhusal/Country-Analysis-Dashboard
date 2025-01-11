'use client';

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './navbar.css'; 
import Image from 'next/image';

const Navbar: FC = () => {
  const pathname = usePathname();
   const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDarkMode);
    if (isDarkMode) {
      document.body.classList.add('dark-mode');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', (!darkMode).toString());
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-inner">
          <div className="navbar-brand">
            <Link
              href="/">
                <Image src={'/logo.png'} width={200} height={100} alt='logo'/>
            </Link>
          </div>
          <div className="navbar-links">
            <Link
              href="/"
              className={`nav-link ${pathname === '/' ? 'active' : ''}`}
            >
              Table View
            </Link>
            <Link
              href="/charts"
              className={`nav-link ${pathname === '/charts' ? 'active' : ''}`}
            >
              Charts View
            </Link>
             <div className="theme-toggle">
              <label className="switch">
                <input 
                  type="checkbox" 
                  checked={darkMode}
                  onChange={toggleDarkMode}
                />
                <span className="slider round"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
