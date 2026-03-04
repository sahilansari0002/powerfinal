interface WhoWeHelpProps {
  isDarkMode: boolean;
}

export function WhoWeHelp({ isDarkMode }: WhoWeHelpProps) {
  const groups = [
    {
      icon: '👧',
      title: 'Girls',
      description: 'Young girls facing educational barriers, early marriage pressure, or family conflicts.',
      age: 'Ages 10-18',
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: '👩',
      title: 'Young Women',
      description: 'Women starting their careers, facing workplace harassment, or relationship issues.',
      age: 'Ages 18-30',
      color: 'from-purple-400 to-pink-500'
    },
    {
      icon: '👰',
      title: 'Married Women',
      description: 'Women dealing with domestic violence, marital disputes, or in-law problems.',
      age: 'All Ages',
      color: 'from-rose-400 to-purple-500'
    },
    {
      icon: '💔',
      title: 'Divorced Women',
      description: 'Women seeking support during or after divorce, custody battles, or financial struggles.',
      age: 'All Ages',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      icon: '👵',
      title: 'Elder Women',
      description: 'Senior women facing neglect, property disputes, or health-related challenges.',
      age: 'Ages 60+',
      color: 'from-purple-400 to-indigo-500'
    }
  ];

  return (
    <section 
      className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-indigo-900 to-purple-800' 
          : 'bg-gradient-to-br from-rose-50 to-purple-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600'
          }`}>
            Who We Help
          </h2>
          
          <div className={`w-20 h-1 rounded-full mx-auto mb-8 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-rose-400 to-purple-400' 
              : 'bg-gradient-to-r from-rose-500 to-purple-500'
          }`} />
          
          <p className={`text-2xl font-medium mb-4 ${
            isDarkMode ? 'text-yellow-300' : 'text-purple-600'
          }`}>
            "Age doesn't matter. Pain doesn't need permission."
          </p>
          
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-purple-200' : 'text-gray-700'
          }`}>
            We support women and girls of all ages, backgrounds, and circumstances. 
            Every story matters, every voice deserves to be heard.
          </p>
        </div>

        {/* Groups Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {groups.map((group, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
                  : 'bg-white/80 border border-rose-200/50 hover:bg-white/90'
              }`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${group.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-20 h-20 mb-6 rounded-3xl bg-gradient-to-r ${group.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110`}>
                <span className="text-3xl">{group.icon}</span>
              </div>

              {/* Content */}
              <div className="relative z-10">
                <h3 className={`text-2xl font-bold mb-2 ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {group.title}
                </h3>
                
                <p className={`text-sm font-medium mb-4 ${
                  isDarkMode ? 'text-rose-300' : 'text-rose-600'
                }`}>
                  {group.age}
                </p>
                
                <p className={`text-base leading-relaxed ${
                  isDarkMode ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  {group.description}
                </p>
              </div>

              {/* Decorative elements */}
              <div className="absolute top-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${group.color}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Universal Support Message */}
        <div className={`text-center p-12 rounded-3xl backdrop-blur-md ${
          isDarkMode 
            ? 'bg-white/10 border border-purple-400/30' 
            : 'bg-white/80 border border-rose-200/50'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-2xl">🤝</span>
            </div>
            
            <h3 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Beyond Categories, Beyond Boundaries
            </h3>
            
            <p className={`text-xl leading-relaxed mb-8 ${
              isDarkMode ? 'text-purple-200' : 'text-gray-700'
            }`}>
              Whether you're a student facing harassment, a working woman dealing with discrimination, 
              a mother protecting her children, or a grandmother fighting for your rights — 
              <span className={`font-bold ${isDarkMode ? 'text-rose-300' : 'text-rose-600'}`}>
                {' '}we are here for you
              </span>.
            </p>

            {/* Support pillars */}
            <div className="grid md:grid-cols-4 gap-6">
              {[
                { icon: '💪', text: 'Strength' },
                { icon: '🛡️', text: 'Protection' },
                { icon: '❤️', text: 'Care' },
                { icon: '⚖️', text: 'Justice' }
              ].map((pillar, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl mb-2">{pillar.icon}</div>
                  <p className={`font-semibold ${
                    isDarkMode ? 'text-purple-200' : 'text-gray-700'
                  }`}>
                    {pillar.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
