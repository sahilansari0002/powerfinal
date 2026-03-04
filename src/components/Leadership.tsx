interface LeadershipProps {
  isDarkMode: boolean;
}

export function Leadership({ isDarkMode }: LeadershipProps) {
  return (
    <section 
      className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-indigo-900 to-purple-900' 
          : 'bg-gradient-to-br from-purple-50 to-pink-50'
      }`}
    >
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
          isDarkMode 
            ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300' 
            : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600'
        }`}>
          Our Leadership
        </h2>
        
        <div className={`w-20 h-1 rounded-full mx-auto mb-12 ${
          isDarkMode 
            ? 'bg-gradient-to-r from-rose-400 to-purple-400' 
            : 'bg-gradient-to-r from-rose-500 to-purple-500'
        }`} />

        {/* Leadership Card */}
        <div className={`relative p-8 md:p-12 rounded-3xl backdrop-blur-md ${
          isDarkMode 
            ? 'bg-white/10 border border-purple-400/30' 
            : 'bg-white/80 border border-rose-200/50'
        } shadow-2xl max-w-2xl mx-auto`}>
          
          {/* Decorative elements */}
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <div className="w-12 h-12 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">👑</span>
            </div>
          </div>

          {/* Profile Image Placeholder */}
          <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-xl">
            <span className="text-6xl">👩‍💼</span>
          </div>

          {/* Content */}
          <h3 className={`text-3xl font-bold mb-2 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Ayesha Anam
          </h3>
          
          <p className={`text-xl mb-6 ${
            isDarkMode ? 'text-rose-300' : 'text-rose-600'
          }`}>
            Mahila President
          </p>
          
          <p className={`text-lg leading-relaxed mb-8 ${
            isDarkMode ? 'text-purple-200' : 'text-gray-700'
          }`}>
            "A dedicated leader committed to women's dignity, justice, and empowerment. 
            With years of experience in social work and women's rights advocacy, 
            she leads our mission to create a safer world for every woman."
          </p>

          {/* Leadership Qualities */}
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: '💪', title: 'Empowerment', desc: 'Inspiring strength in every woman' },
              { icon: '⚖️', title: 'Justice', desc: 'Fighting for equal rights' },
              { icon: '❤️', title: 'Compassion', desc: 'Leading with empathy and care' }
            ].map((quality, index) => (
              <div key={index} className={`p-4 rounded-xl ${
                isDarkMode 
                  ? 'bg-purple-800/30 border border-purple-600/20' 
                  : 'bg-rose-50 border border-rose-200/50'
              }`}>
                <div className="text-2xl mb-2">{quality.icon}</div>
                <h4 className={`font-semibold mb-1 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {quality.title}
                </h4>
                <p className={`text-sm ${
                  isDarkMode ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  {quality.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className={`mt-8 p-6 rounded-xl ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-800/50 to-indigo-800/50 border border-purple-500/30' 
              : 'bg-gradient-to-r from-rose-100 to-purple-100 border border-rose-200'
          }`}>
            <p className={`text-lg font-medium italic ${
              isDarkMode ? 'text-purple-100' : 'text-gray-700'
            }`}>
              "Every woman deserves to live with dignity, safety, and hope. 
              Our work is not just about solving problems — it's about transforming lives."
            </p>
          </div>
        </div>

        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className={`absolute opacity-20 ${
                isDarkMode ? 'text-purple-300' : 'text-rose-400'
              }`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: `${Math.random() * 15 + 10}px`,
                animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            >
              ✨
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
