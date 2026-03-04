interface ServicesProps {
  isDarkMode: boolean;
}

export function Services({ isDarkMode }: ServicesProps) {
  const services = [
    {
      icon: '⚖️',
      title: 'Divorce & Family Dispute Support',
      description: 'Legal guidance and emotional support for women going through divorce and family conflicts.',
      color: 'from-rose-400 to-pink-500'
    },
    {
      icon: '🛡️',
      title: 'Mental Harassment & Abuse Help',
      description: 'Immediate support and protection for women facing mental, emotional, or physical abuse.',
      color: 'from-purple-400 to-indigo-500'
    },
    {
      icon: '📋',
      title: 'Women Rights Guidance',
      description: 'Education and advocacy about women\'s legal rights and how to exercise them effectively.',
      color: 'from-pink-400 to-rose-500'
    },
    {
      icon: '💝',
      title: 'Emotional & Counseling Support',
      description: 'Professional counseling services to help women heal and rebuild their confidence.',
      color: 'from-indigo-400 to-purple-500'
    },
    {
      icon: '💒',
      title: 'Marriage Help for Poor Girls',
      description: 'Financial and social support to help underprivileged girls with marriage arrangements.',
      color: 'from-rose-400 to-purple-500'
    },
    {
      icon: '🚨',
      title: 'Emergency Support & Guidance',
      description: '24/7 emergency helpline and immediate assistance for women in crisis situations.',
      color: 'from-red-400 to-rose-500'
    }
  ];

  return (
    <section 
      id="services" 
      className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-900 to-indigo-900' 
          : 'bg-gradient-to-br from-white to-purple-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600'
          }`}>
            Our Services
          </h2>
          
          <div className={`w-20 h-1 rounded-full mx-auto mb-8 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-rose-400 to-purple-400' 
              : 'bg-gradient-to-r from-rose-500 to-purple-500'
          }`} />
          
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-purple-200' : 'text-gray-700'
          }`}>
            Comprehensive support services designed to empower, protect, and uplift women across all walks of life.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={`group relative p-8 rounded-3xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-2xl ${
                isDarkMode 
                  ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
                  : 'bg-white/80 border border-rose-200/50 hover:bg-white/90'
              }`}
            >
              {/* Decorative gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-3xl transition-opacity duration-300`} />
              
              {/* Icon */}
              <div className={`w-16 h-16 mb-6 rounded-2xl bg-gradient-to-r ${service.color} flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                <span className="text-2xl">{service.icon}</span>
              </div>

              {/* Content */}
              <h3 className={`text-xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {service.title}
              </h3>
              
              <p className={`text-base leading-relaxed ${
                isDarkMode ? 'text-purple-200' : 'text-gray-600'
              }`}>
                {service.description}
              </p>

              {/* Hover effect */}
              <div className={`absolute bottom-4 right-4 w-8 h-8 rounded-full bg-gradient-to-r ${service.color} opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center`}>
                <span className="text-white text-sm">→</span>
              </div>

              {/* Floating particles on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-gradient-to-r ${service.color} rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500`}
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${20 + i * 20}%`,
                      animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`
                    }}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className={`inline-block p-8 rounded-3xl backdrop-blur-md ${
            isDarkMode 
              ? 'bg-white/10 border border-purple-400/30' 
              : 'bg-white/80 border border-rose-200/50'
          }`}>
            <h3 className={`text-2xl font-bold mb-4 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Need Immediate Help?
            </h3>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-purple-200' : 'text-gray-600'
            }`}>
              Don't wait. Reach out to us now for confidential support and guidance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#contact"
                className="px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Get Help Now
              </a>
              <a
                href="tel:+919876543210"
                className={`px-8 py-3 font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white' 
                    : 'border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white'
                }`}
              >
                Emergency Call
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
