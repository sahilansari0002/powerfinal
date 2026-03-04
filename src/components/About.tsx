interface AboutProps {
  isDarkMode: boolean;
}

export function About({ isDarkMode }: AboutProps) {
  return (
    <section 
      id="about" 
      className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-800 to-indigo-800' 
          : 'bg-gradient-to-br from-white to-rose-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div className="space-y-6">
            <h2 className={`text-4xl md:text-5xl font-bold ${
              isDarkMode 
                ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300' 
                : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600'
            }`}>
              Who We Are
            </h2>
            
            <div className={`w-20 h-1 rounded-full ${
              isDarkMode 
                ? 'bg-gradient-to-r from-rose-400 to-purple-400' 
                : 'bg-gradient-to-r from-rose-500 to-purple-500'
            }`} />
            
            <p className={`text-lg leading-relaxed ${
              isDarkMode ? 'text-purple-100' : 'text-gray-700'
            }`}>
              We are a women-focused NGO based in Akola, working across India under 
              <span className={`font-semibold ${isDarkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                {' '}Human Rights Jan Kalyan Jan Seva Mandal
              </span>. 
              We support girls and women facing divorce, mental harassment, domestic problems, 
              and social injustice.
            </p>
            
            <p className={`text-lg leading-relaxed ${
              isDarkMode ? 'text-purple-100' : 'text-gray-700'
            }`}>
              We also help poor girls with marriage support. 
              <span className={`font-bold ${isDarkMode ? 'text-yellow-300' : 'text-purple-600'}`}>
                {' '}Age is never a barrier — if a woman needs help, we are here.
              </span>
            </p>

            {/* Mission Points */}
            <div className="space-y-4 mt-8">
              {[
                { icon: '🛡️', text: 'Protection from harassment and abuse' },
                { icon: '⚖️', text: 'Legal support and guidance' },
                { icon: '💝', text: 'Marriage support for underprivileged girls' },
                { icon: '🤝', text: 'Emotional counseling and care' },
                { icon: '🌍', text: 'Pan-India women empowerment' }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                    isDarkMode 
                      ? 'bg-purple-700/50 border border-purple-500/30' 
                      : 'bg-rose-100 border border-rose-200'
                  }`}>
                    <span className="text-xl">{item.icon}</span>
                  </div>
                  <p className={`text-lg ${
                    isDarkMode ? 'text-purple-200' : 'text-gray-700'
                  }`}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className={`relative p-8 rounded-3xl backdrop-blur-md ${
              isDarkMode 
                ? 'bg-white/10 border border-purple-400/30' 
                : 'bg-white/80 border border-rose-200/50'
            } shadow-2xl`}>
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full animate-pulse" />
              
              {/* Content */}
              <div className="text-center space-y-6">
                <div className="w-24 h-24 mx-auto bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-4xl">🌸</span>
                </div>
                
                <h3 className={`text-2xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  Our Vision
                </h3>
                
                <p className={`text-lg leading-relaxed ${
                  isDarkMode ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  A society where every woman feels safe, empowered, and supported. 
                  Where justice is accessible, dignity is preserved, and hope never fades.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${
                      isDarkMode ? 'text-rose-300' : 'text-rose-600'
                    }`}>
                      2000+
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-purple-200' : 'text-gray-600'
                    }`}>
                      Women Helped
                    </div>
                  </div>
                  <div className="text-center">
                    <div className={`text-3xl font-bold ${
                      isDarkMode ? 'text-purple-300' : 'text-purple-600'
                    }`}>
                      15+
                    </div>
                    <div className={`text-sm ${
                      isDarkMode ? 'text-purple-200' : 'text-gray-600'
                    }`}>
                      States Covered
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -z-10 inset-0">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className={`absolute w-4 h-4 rounded-full ${
                    isDarkMode ? 'bg-purple-400/20' : 'bg-rose-300/30'
                  } animate-pulse`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
