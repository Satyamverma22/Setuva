import React, { useState, useEffect } from 'react';

export default function Navbar({ currentView = 'home', onViewChange, currentUser, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, item) => {
    e.preventDefault();
    const view = item.toLowerCase();
    if (onViewChange) {
      onViewChange(view);
    }
  };

  const navItems = ['Home', 'Library', 'Community', 'Legacy', 'Govt Schemes', 'About Us'];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'glass py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* Logo brand */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, 'Home')}
          className="flex items-center space-x-3 text-brand-primary hover:scale-[1.01] transition-transform duration-200"
        >
          <svg className="w-8 h-8" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 22C4 18 10 14 16 14C22 14 28 18 28 22" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M16 4C18.2091 4 20 5.79086 20 8C20 10.2091 18.2091 12 16 12C13.7909 12 12 10.2091 12 8C12 5.79086 13.7909 4 16 4Z" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <path d="M4 22H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
            <circle cx="9" cy="18" r="1.5" fill="currentColor" />
            <circle cx="23" cy="18" r="1.5" fill="currentColor" />
            <path d="M16 14V22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="2 2" />
          </svg>
          <span className="text-2xl font-bold tracking-tight text-slate-800">
            Setu
          </span>
        </a>

        {/* Center Links (Desktop) */}
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => {
            const isActive = currentView === item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`}
                onClick={(e) => handleNavClick(e, item)}
                className={`text-sm font-semibold transition-all duration-200 relative py-1 ${isActive
                    ? 'text-brand-primary'
                    : 'text-slate-655 hover:text-brand-primary'
                  }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary rounded-full animate-fade-in" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right side buttons / Profile (Desktop) */}
        <div className="hidden md:flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              <button
                onClick={() => onViewChange('contribute')}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs rounded-full shadow-md shadow-brand-primary/10 transition-all duration-200 cursor-pointer"
              >
                + Share Knowledge
              </button>
              <button
                onClick={() => onViewChange('profile')}
                className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-full border transition-all duration-300 cursor-pointer ${
                  currentView === 'profile'
                    ? 'border-brand-primary bg-brand-light text-brand-hover'
                    : 'border-slate-200 hover:border-brand-primary bg-white text-slate-700'
                }`}
              >
                <img
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt="Avatar"
                  className="w-6 h-6 rounded-full object-cover border border-slate-100"
                />
                <span className="text-xs font-bold">{currentUser.name}</span>
              </button>
              <button
                onClick={onLogout}
                className="text-xs font-bold text-slate-500 hover:text-brand-primary transition-colors cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onViewChange('signin')}
                className="px-5 py-2 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold text-xs rounded-full transition-all duration-200 cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => onViewChange('signup')}
                className="px-5 py-2 bg-brand-primary hover:bg-brand-hover text-white font-bold text-xs rounded-full shadow-md shadow-brand-primary/10 hover:shadow-brand-hover/20 hover:scale-[1.02] transition-all duration-200 cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Menu Toggle (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-slate-700 hover:text-brand-primary focus:outline-none transition-colors"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 border-t border-slate-100 shadow-xl transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
          }`}
      >
        <div className="glass px-6 py-6 flex flex-col space-y-4">
          {navItems.map((item) => {
            const isActive = currentView === item.toLowerCase();
            return (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(' ', '')}`}
                onClick={(e) => {
                  setIsOpen(false);
                  handleNavClick(e, item);
                }}
                className={`text-base font-semibold py-1 transition-colors ${isActive
                    ? 'text-brand-primary'
                    : 'text-slate-700 hover:text-brand-primary'
                  }`}
              >
                {item}
              </a>
            );
          })}

          {/* Authentication inside Mobile Menu */}
          {currentUser ? (
            <div className="flex flex-col space-y-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onViewChange('contribute');
                }}
                className="w-full text-center py-2.5 bg-brand-primary hover:bg-brand-hover text-white font-semibold text-base rounded-full shadow-md transition-all cursor-pointer"
              >
                + Share Knowledge
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onViewChange('profile');
                }}
                className="flex items-center space-x-3 text-slate-700 hover:text-brand-primary font-semibold text-base py-1.5 cursor-pointer text-left"
              >
                <img
                  src={currentUser.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100"}
                  alt="Avatar"
                  className="w-8 h-8 rounded-full object-cover border border-slate-200"
                />
                <span>Profile ({currentUser.name})</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onLogout();
                }}
                className="text-left text-slate-500 hover:text-brand-primary font-semibold text-base py-1.5 cursor-pointer"
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex flex-col space-y-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => {
                  setIsOpen(false);
                  onViewChange('signin');
                }}
                className="w-full text-center py-2.5 border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-semibold text-base rounded-full transition-all cursor-pointer"
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setIsOpen(false);
                  onViewChange('signup');
                }}
                className="w-full text-center py-2.5 bg-brand-primary hover:bg-brand-hover text-white font-semibold text-base rounded-full shadow-md transition-all cursor-pointer"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
