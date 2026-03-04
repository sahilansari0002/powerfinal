import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';

interface HeroProps {
  isDarkMode: boolean;
}

export function Hero({ isDarkMode }: HeroProps) {
  const { t } = useTranslation();
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPos = (clientX / innerWidth - 0.5) * 10; // Reduced for mobile
      const yPos = (clientY / innerHeight - 0.5) * 10;
      
      const elements = heroRef.current.querySelectorAll('.parallax-element');
      elements.forEach((element, index) => {
        const speed = (index + 1) * 0.3; // Reduced for smoother mobile experience
        (element as HTMLElement).style.transform = 
          `translate(${xPos * speed}px, ${yPos * speed}px)`;
      });
    };

    // Only add mouse move on desktop
    if (window.innerWidth > 768) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      id="home" 
      ref={heroRef}
      className={`relative min-h-screen flex items-center justify-center overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800' 
          : 'bg-gradient-to-br from-rose-100 via-pink-100 to-purple-100'
      }`}
    >
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Floating hearts */}
        {[...Array(12)].map((_, i) => (
          <div
            key={`heart-${i}`}
            className={`parallax-element absolute opacity-20 animate-pulse ${
              isDarkMode ? 'text-rose-300' : 'text-rose-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 15 + 12}px`, // Smaller for mobile
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            💖
          </div>
        ))}

        {/* Floating shields */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`shield-${i}`}
            className={`parallax-element absolute opacity-15 animate-bounce ${
              isDarkMode ? 'text-purple-300' : 'text-purple-400'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 10 + 18}px`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          >
            🛡️
          </div>
        ))}

        {/* Justice scales */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`justice-${i}`}
            className={`parallax-element absolute opacity-10 animate-pulse ${
              isDarkMode ? 'text-yellow-300' : 'text-yellow-500'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              fontSize: `${Math.random() * 8 + 20}px`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 2}s`
            }}
          >
            ⚖️
          </div>
        ))}

        {/* Glowing orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`orb-${i}`}
            className={`parallax-element absolute rounded-full blur-sm ${
              isDarkMode 
                ? 'bg-gradient-to-r from-rose-400/20 to-purple-400/20' 
                : 'bg-gradient-to-r from-rose-300/30 to-purple-300/30'
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 60 + 40}px`, // Smaller for mobile
              height: `${Math.random() * 60 + 40}px`,
              animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 3}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Main Heading */}
        <div className="mb-8">
          <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-purple-300 to-pink-300' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-purple-600 to-pink-600'
          }`}>
            {t('hero.title1')}
            <br />
            <span className="relative">
              {t('hero.title2')}
              <div className={`absolute -bottom-2 left-0 right-0 h-1 ${
                isDarkMode 
                  ? 'bg-gradient-to-r from-rose-400 to-purple-400' 
                  : 'bg-gradient-to-r from-rose-500 to-purple-500'
              } rounded-full`} />
            </span>
          </h1>
          
          <p className={`text-lg md:text-xl lg:text-2xl mb-8 leading-relaxed ${
            isDarkMode ? 'text-purple-200' : 'text-gray-700'
          }`}>
            {t('hero.subtitle')}
          </p>
        </div>

        {/* Organization Info */}
        <div className={`mb-12 p-6 rounded-2xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
          isDarkMode 
            ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
            : 'bg-white/60 border border-rose-200/50 hover:bg-white/70'
        }`}>
          <h2 className={`text-xl md:text-2xl font-semibold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {t('hero.orgFull')}
          </h2>
          <p className={`text-base md:text-lg ${
            isDarkMode ? 'text-purple-200' : 'text-gray-600'
          }`}>
            {t('hero.under')}
          </p>
          <p className={`text-base md:text-lg font-medium ${
            isDarkMode ? 'text-rose-300' : 'text-rose-600'
          }`}>
            {t('hero.president')}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-full shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 hover:scale-105 active:scale-95 transform"
          >
            <span className="relative z-10">{t('hero.getHelp')}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-rose-600 to-purple-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </a>
          
          <a
            href="#contact"
            className={`px-8 py-4 font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDarkMode 
                ? 'border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white' 
                : 'border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white'
            }`}
          >
            {t('hero.contact')}
          </a>
          
          <a
            href="#impact"
            className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 active:scale-95 ${
              isDarkMode 
                ? 'text-yellow-300 hover:text-yellow-200' 
                : 'text-purple-600 hover:text-purple-700'
            }`}
          >
            {t('hero.donate')}
          </a>
        </div>

        {/* Floating Keywords */}
        <div className="flex flex-wrap justify-center gap-3">
          {Object.values(t('hero.keywords', { returnObjects: true }) as Record<string, string>).map((word, index) => (
            <span
              key={word}
              className={`px-4 py-2 rounded-full text-sm font-medium backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                isDarkMode 
                  ? 'bg-white/10 text-purple-200 border border-purple-400/30 hover:bg-white/20' 
                  : 'bg-white/50 text-gray-700 border border-rose-200/50 hover:bg-white/70'
              }`}
              style={{
                animation: `float ${2 + index * 0.5}s ease-in-out infinite`,
                animationDelay: `${index * 0.2}s`
              }}
            >
              {word}
            </span>
          ))}
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className={`w-6 h-10 border-2 rounded-full flex justify-center transition-colors duration-300 ${
          isDarkMode ? 'border-purple-300' : 'border-gray-400'
        }`}>
          <div className={`w-1 h-3 rounded-full mt-2 animate-pulse ${
            isDarkMode ? 'bg-purple-300' : 'bg-gray-400'
          }`} />
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </section>
  );
}
