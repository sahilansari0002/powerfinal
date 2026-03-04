import { useState } from "react";
import { useTranslation } from 'react-i18next';
import { LanguageToggle } from './LanguageToggle';

interface NavigationProps {
  isDarkMode: boolean;
  setIsDarkMode: (value: boolean) => void;
}

export function Navigation({ isDarkMode, setIsDarkMode }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  const navItems = [
    { name: t('nav.home'), href: "#home" },
    { name: t('nav.about'), href: "#about" },
    { name: t('nav.services'), href: "#services" },
    { name: t('nav.impact'), href: "#impact" },
    { name: t('nav.gallery'), href: "#gallery" },
    { name: t('nav.contact'), href: "#contact" },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-purple-900/90 backdrop-blur-md border-b border-purple-700/50' 
        : 'bg-white/90 backdrop-blur-md border-b border-rose-200/50'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-transform duration-300 hover:scale-110 ${
              isDarkMode ? 'bg-gradient-to-r from-rose-400 to-purple-400' : 'bg-gradient-to-r from-rose-500 to-purple-500'
            }`}>
              <span className="text-white text-lg">🌸</span>
            </div>
            <div>
              <h1 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                {t('nav.orgName')}
              </h1>
              <p className={`text-xs ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                {t('nav.location')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-300 hover:scale-105 hover:translate-y-[-1px] ${
                  isDarkMode 
                    ? 'text-purple-200 hover:text-rose-300' 
                    : 'text-gray-700 hover:text-rose-600'
                }`}
              >
                {item.name}
              </a>
            ))}
            
            {/* Language Toggle */}
            <LanguageToggle isDarkMode={isDarkMode} />
            
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12 ${
                isDarkMode 
                  ? 'bg-purple-800 text-yellow-300 hover:bg-purple-700' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>

            {/* Emergency Button */}
            <a
              href="#contact"
              className="bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-rose-500/25 animate-pulse"
            >
              {t('nav.getHelp')}
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <LanguageToggle isDarkMode={isDarkMode} />
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                isDarkMode ? 'text-yellow-300' : 'text-gray-600'
              }`}
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 transition-transform duration-300 ${
                isMenuOpen ? 'rotate-90' : ''
              } ${isDarkMode ? 'text-white' : 'text-gray-800'}`}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden py-4 border-t transition-all duration-300 ${
            isDarkMode ? 'border-purple-700/50' : 'border-rose-200/50'
          }`}>
            {navItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`block py-3 text-sm font-medium transition-all duration-300 hover:translate-x-2 ${
                  isDarkMode ? 'text-purple-200 hover:text-rose-300' : 'text-gray-700 hover:text-rose-600'
                }`}
                style={{
                  animation: `slideInLeft 0.3s ease-out ${index * 0.1}s both`
                }}
              >
                {item.name}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setIsMenuOpen(false)}
              className="block mt-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white px-4 py-3 rounded-full text-sm font-medium text-center transition-all duration-300 hover:scale-105"
            >
              {t('nav.getHelp')}
            </a>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </nav>
  );
}
