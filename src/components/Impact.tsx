import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useEffect, useState } from "react";

interface ImpactProps {
  isDarkMode: boolean;
}

export function Impact({ isDarkMode }: ImpactProps) {
  const stats = useQuery(api.contacts.getStats);
  const [animatedStats, setAnimatedStats] = useState({
    womenSupported: 0,
    familiesHelped: 0,
    casesResolved: 0,
    marriagesSupported: 0
  });

  useEffect(() => {
    if (!stats) return;

    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      
      setAnimatedStats({
        womenSupported: Math.floor(stats.womenSupported * progress),
        familiesHelped: Math.floor(stats.familiesHelped * progress),
        casesResolved: Math.floor(stats.casesResolved * progress),
        marriagesSupported: Math.floor(stats.marriagesSupported * progress)
      });

      if (currentStep >= steps) {
        clearInterval(timer);
        setAnimatedStats(stats);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [stats]);

  const impactAreas = [
    {
      icon: '🏛️',
      title: 'Gujarat',
      description: 'Our home base in Surat with extensive local networks',
      highlight: 'Primary Hub'
    },
    {
      icon: '🌆',
      title: 'Maharashtra',
      description: 'Strong presence in Mumbai and Pune regions',
      highlight: 'Major Cities'
    },
    {
      icon: '🏙️',
      title: 'Delhi NCR',
      description: 'Capital region support and advocacy work',
      highlight: 'Policy Center'
    },
    {
      icon: '🌴',
      title: 'South India',
      description: 'Expanding reach in Karnataka, Tamil Nadu, and Kerala',
      highlight: 'Growing Network'
    },
    {
      icon: '🏔️',
      title: 'North India',
      description: 'Support networks in Punjab, Haryana, and UP',
      highlight: 'Rural Focus'
    },
    {
      icon: '🌊',
      title: 'East India',
      description: 'Emerging presence in West Bengal and Odisha',
      highlight: 'New Frontiers'
    }
  ];

  return (
    <section 
      id="impact" 
      className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-900 to-indigo-900' 
          : 'bg-gradient-to-br from-white to-rose-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600'
          }`}>
            Our Impact Across India
          </h2>
          
          <div className={`w-20 h-1 rounded-full mx-auto mb-8 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-rose-400 to-purple-400' 
              : 'bg-gradient-to-r from-rose-500 to-purple-500'
          }`} />
          
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-purple-200' : 'text-gray-700'
          }`}>
            From Akola to every corner of India, our mission reaches women who need support, 
            justice, and empowerment.
          </p>
        </div>

        {/* Statistics */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {[
            { 
              key: 'womenSupported', 
              label: 'Women Supported', 
              icon: '👩‍🤝‍👩', 
              color: 'from-rose-400 to-pink-500',
              suffix: '+'
            },
            { 
              key: 'familiesHelped', 
              label: 'Families Helped', 
              icon: '👨‍👩‍👧‍👦', 
              color: 'from-purple-400 to-indigo-500',
              suffix: '+'
            },
            { 
              key: 'casesResolved', 
              label: 'Cases Resolved', 
              icon: '⚖️', 
              color: 'from-indigo-400 to-purple-500',
              suffix: '+'
            },
            { 
              key: 'marriagesSupported', 
              label: 'Marriages Supported', 
              icon: '💒', 
              color: 'from-pink-400 to-rose-500',
              suffix: '+'
            }
          ].map((stat, index) => (
            <div
              key={stat.key}
              className={`text-center p-8 rounded-3xl backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'bg-white/10 border border-purple-400/30' 
                  : 'bg-white/80 border border-rose-200/50'
              }`}
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}>
                <span className="text-2xl">{stat.icon}</span>
              </div>
              
              <div className={`text-4xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {animatedStats[stat.key as keyof typeof animatedStats]?.toLocaleString()}{stat.suffix}
              </div>
              
              <p className={`text-sm font-medium ${
                isDarkMode ? 'text-purple-200' : 'text-gray-600'
              }`}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* India Map Representation */}
        <div className="mb-16">
          <h3 className={`text-3xl font-bold text-center mb-12 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            Pan-India Presence
          </h3>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-6">
            {impactAreas.map((area, index) => (
              <div
                key={index}
                className={`group p-6 rounded-2xl backdrop-blur-md transition-all duration-300 hover:scale-105 ${
                  isDarkMode 
                    ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
                    : 'bg-white/80 border border-rose-200/50 hover:bg-white/90'
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
              >
                <div className="text-center">
                  <div className="text-3xl mb-3">{area.icon}</div>
                  <h4 className={`font-bold mb-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    {area.title}
                  </h4>
                  <p className={`text-xs mb-2 ${
                    isDarkMode ? 'text-rose-300' : 'text-rose-600'
                  }`}>
                    {area.highlight}
                  </p>
                  <p className={`text-sm ${
                    isDarkMode ? 'text-purple-200' : 'text-gray-600'
                  }`}>
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className={`text-center p-12 rounded-3xl backdrop-blur-md ${
          isDarkMode 
            ? 'bg-white/10 border border-purple-400/30' 
            : 'bg-white/80 border border-rose-200/50'
        }`}>
          <div className="max-w-4xl mx-auto">
            <h3 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Join Our Mission
            </h3>
            
            <p className={`text-xl leading-relaxed mb-8 ${
              isDarkMode ? 'text-purple-200' : 'text-gray-700'
            }`}>
              Help us expand our reach and impact. Whether through donations, volunteering, 
              or spreading awareness, every contribution makes a difference in a woman's life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                Donate Now
              </button>
              <button className={`px-8 py-3 font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 ${
                isDarkMode 
                  ? 'border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white' 
                  : 'border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white'
              }`}>
                Volunteer With Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
