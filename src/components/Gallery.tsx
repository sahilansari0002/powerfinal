import { useState } from "react";
import { useTranslation } from 'react-i18next';

interface GalleryProps {
  isDarkMode: boolean;
}

export function Gallery({ isDarkMode }: GalleryProps) {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Activities', icon: '🌟' },
    { id: 'awareness', name: 'Awareness Programs', icon: '📢' },
    { id: 'counseling', name: 'Counseling Sessions', icon: '💬' },
    { id: 'community', name: 'Community Support', icon: '🤝' },
    { id: 'events', name: 'Events & Meetings', icon: '🎉' }
  ];

  // Enhanced gallery items with real example photos represented by detailed descriptions
  const galleryItems = [
    {
      id: 1,
      title: 'Women Rights Workshop',
      category: 'awareness',
      description: 'Educational session on legal rights and protection laws - 50+ women attended',
      image: '👩‍🏫',
      date: '2024-01-15',
      participants: 52,
      location: 'Surat Community Center'
    },
    {
      id: 2,
      title: 'Support Group Meeting',
      category: 'counseling',
      description: 'Group therapy session for domestic violence survivors - Safe space for healing',
      image: '👥',
      date: '2024-01-20',
      participants: 18,
      location: 'Private Counseling Center'
    },
    {
      id: 3,
      title: 'Rural Community Outreach',
      category: 'community',
      description: 'Reaching out to rural communities for awareness - Door-to-door support',
      image: '🏘️',
      date: '2024-01-25',
      participants: 200,
      location: 'Villages near Surat'
    },
    {
      id: 4,
      title: 'Annual Conference 2024',
      category: 'events',
      description: 'Annual gathering of supporters and beneficiaries - Celebrating progress',
      image: '🏛️',
      date: '2024-02-01',
      participants: 300,
      location: 'Surat Convention Hall'
    },
    {
      id: 5,
      title: 'Self Defense Training',
      category: 'awareness',
      description: 'Physical and mental self-defense workshop - Empowering women with skills',
      image: '🥋',
      date: '2024-02-05',
      participants: 35,
      location: 'Sports Complex'
    },
    {
      id: 6,
      title: 'Marriage Support Program',
      category: 'community',
      description: 'Supporting underprivileged girls with marriage arrangements - 5 marriages supported',
      image: '💒',
      date: '2024-02-10',
      participants: 25,
      location: 'Community Hall'
    },
    {
      id: 7,
      title: 'Legal Aid Camp',
      category: 'awareness',
      description: 'Free legal consultation for women - Lawyers volunteered their time',
      image: '⚖️',
      date: '2024-02-15',
      participants: 80,
      location: 'District Court Complex'
    },
    {
      id: 8,
      title: 'Skill Development Workshop',
      category: 'community',
      description: 'Teaching tailoring and handicrafts for economic independence',
      image: '✂️',
      date: '2024-02-20',
      participants: 40,
      location: 'Vocational Training Center'
    },
    {
      id: 9,
      title: 'Mental Health Awareness',
      category: 'counseling',
      description: 'Breaking stigma around mental health - Professional counselors present',
      image: '🧠',
      date: '2024-02-25',
      participants: 65,
      location: 'Medical College Auditorium'
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  return (
    <section 
      id="gallery" 
      className={`py-20 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-indigo-900 to-purple-800' 
          : 'bg-gradient-to-br from-purple-50 to-rose-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl font-bold mb-8 ${
            isDarkMode 
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-rose-300 to-purple-300' 
              : 'text-transparent bg-clip-text bg-gradient-to-r from-rose-600 to-purple-600'
          }`}>
            Our Activities & Impact
          </h2>
          
          <div className={`w-20 h-1 rounded-full mx-auto mb-8 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-rose-400 to-purple-400' 
              : 'bg-gradient-to-r from-rose-500 to-purple-500'
          }`} />
          
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-purple-200' : 'text-gray-700'
          }`}>
            Witness the real stories of change, empowerment, and hope through our community programs and initiatives.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-rose-500 to-purple-600 text-white shadow-lg transform scale-105'
                  : isDarkMode
                    ? 'bg-white/10 text-purple-200 border border-purple-400/30 hover:bg-white/20'
                    : 'bg-white/80 text-gray-700 border border-rose-200/50 hover:bg-white/90'
              }`}
            >
              <span className="mr-2 transition-transform duration-300 hover:scale-125">{category.icon}</span>
              {category.name}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative overflow-hidden rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-105 hover:rotate-1 ${
                isDarkMode 
                  ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
                  : 'bg-white/80 border border-rose-200/50 hover:bg-white/95'
              }`}
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
              }}
            >
              {/* Image/Icon Area */}
              <div className={`relative h-48 flex items-center justify-center overflow-hidden ${
                isDarkMode 
                  ? 'bg-gradient-to-br from-purple-800/50 to-indigo-800/50' 
                  : 'bg-gradient-to-br from-rose-100 to-purple-100'
              }`}>
                <span className="text-6xl transition-transform duration-500 group-hover:scale-125 group-hover:rotate-12">
                  {item.image}
                </span>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Participants badge */}
                <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode 
                    ? 'bg-purple-600/80 text-white' 
                    : 'bg-white/80 text-gray-700'
                }`}>
                  👥 {item.participants} people
                </div>
                
                {/* Date badge */}
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-medium ${
                  isDarkMode 
                    ? 'bg-purple-600/80 text-white' 
                    : 'bg-white/80 text-gray-700'
                }`}>
                  {new Date(item.date).toLocaleDateString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                  isDarkMode ? 'text-white group-hover:text-rose-300' : 'text-gray-800 group-hover:text-rose-600'
                }`}>
                  {item.title}
                </h3>
                
                <p className={`text-base leading-relaxed mb-4 ${
                  isDarkMode ? 'text-purple-200' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>

                {/* Location */}
                <div className="flex items-center mb-4">
                  <span className="text-sm mr-2">📍</span>
                  <span className={`text-sm ${
                    isDarkMode ? 'text-purple-300' : 'text-gray-500'
                  }`}>
                    {item.location}
                  </span>
                </div>

                {/* Category badge */}
                <div className="flex justify-between items-center">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                    isDarkMode 
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-400/30' 
                      : 'bg-rose-100 text-rose-600 border border-rose-200'
                  }`}>
                    {categories.find(cat => cat.id === item.category)?.name}
                  </span>
                  
                  {/* Impact indicator */}
                  <div className="flex items-center space-x-1">
                    <span className="text-yellow-500">⭐</span>
                    <span className={`text-xs ${
                      isDarkMode ? 'text-purple-300' : 'text-gray-500'
                    }`}>
                      High Impact
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover effect border */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-rose-400/50 rounded-3xl transition-all duration-300" />
              
              {/* Floating particles on hover */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 bg-rose-400 rounded-full opacity-0 group-hover:opacity-60 transition-all duration-500`}
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

        {/* Load More / View All */}
        <div className="text-center mt-12">
          <button className={`px-8 py-3 font-semibold rounded-full border-2 transition-all duration-300 hover:scale-105 active:scale-95 ${
            isDarkMode 
              ? 'border-purple-400 text-purple-300 hover:bg-purple-400 hover:text-white' 
              : 'border-rose-500 text-rose-600 hover:bg-rose-500 hover:text-white'
          }`}>
            View More Activities
          </button>
        </div>

        {/* Impact Statement */}
        <div className={`mt-16 text-center p-12 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
          isDarkMode 
            ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
            : 'bg-white/80 border border-rose-200/50 hover:bg-white/90'
        }`}>
          <div className="max-w-4xl mx-auto">
            <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-r from-rose-400 to-purple-400 rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-110 hover:rotate-12">
              <span className="text-2xl">📸</span>
            </div>
            
            <h3 className={`text-3xl font-bold mb-6 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              Every Picture Tells a Story of Hope
            </h3>
            
            <p className={`text-xl leading-relaxed ${
              isDarkMode ? 'text-purple-200' : 'text-gray-700'
            }`}>
              Behind every image is a woman who found her voice, a family that was reunited, 
              or a community that learned to support its daughters. These moments capture 
              the real impact of our collective efforts.
            </p>
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
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
