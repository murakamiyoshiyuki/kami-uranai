import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/fortune', label: '占いを始める' },
    { path: '/gods', label: '神様図鑑' },
    { path: '/about', label: 'このサイトについて' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass' : ''
      }`}
    >
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="group flex items-center space-x-3 relative"
          >
            <div className="relative">
              <Sparkles className="w-8 h-8 text-gold-primary transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 w-8 h-8 bg-gold-primary/20 blur-xl group-hover:bg-gold-primary/30 transition-all" />
            </div>
            <h1 className="text-2xl font-display font-bold">
              <span className="text-gradient-gold">神様</span>
              <span className="text-white">占い</span>
            </h1>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`relative px-1 py-2 font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-gold-primary'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    <span className="relative z-10">{item.label}</span>
                    {/* Hover effect */}
                    <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-gold-dark to-gold-light transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
                    {/* Active indicator */}
                    {isActive && (
                      <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-gold-dark to-gold-light" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gold-primary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 glass transition-all duration-300 overflow-hidden ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <ul className="py-4 px-6 space-y-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block py-2 font-medium transition-colors ${
                      isActive
                        ? 'text-gold-primary'
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}