import { useEffect, useState } from "react";

export function Loader() {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState(0);

  const texts = [
    "You Are Not Alone...",
    "We Stand With You",
    "Justice | Care | Protection | Empowerment"
  ];

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    const textTimer = setInterval(() => {
      setCurrentText(prev => (prev + 1) % texts.length);
    }, 1200);

    return () => {
      clearInterval(progressTimer);
      clearInterval(textTimer);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-indigo-900 to-purple-800 flex items-center justify-center z-50">
      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-rose-300 rounded-full opacity-30 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      <div className="text-center z-10 max-w-md mx-auto px-6">
        {/* Logo circle */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-gradient-to-r from-rose-400 to-purple-400 flex items-center justify-center shadow-2xl animate-pulse">
          <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center">
            <span className="text-2xl">🌸</span>
          </div>
        </div>

        {/* Animated text */}
        <div className="mb-8 h-20">
          <h1 className="text-2xl md:text-3xl font-light text-white mb-4 transition-all duration-500 opacity-80">
            {texts[currentText]}
          </h1>
          <h2 className="text-lg text-rose-200 font-medium">
            Women Support & Empowerment NGO
          </h2>
        </div>

        {/* Loading bar */}
        <div className="w-full bg-white/20 rounded-full h-2 mb-4 overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-rose-400 to-purple-400 rounded-full transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-sm text-purple-200">
          {progress}% Loading...
        </p>
      </div>
    </div>
  );
}
