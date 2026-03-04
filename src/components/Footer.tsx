interface FooterProps {
  isDarkMode: boolean;
}

export function Footer({ isDarkMode }: FooterProps) {
  return (
    <footer 
      className={`py-12 ${
        isDarkMode 
          ? 'bg-gradient-to-br from-purple-900 to-indigo-900 border-t border-purple-700/50' 
          : 'bg-gradient-to-br from-gray-50 to-purple-50 border-t border-rose-200/50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Organization Info */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                isDarkMode ? 'bg-gradient-to-r from-rose-400 to-purple-400' : 'bg-gradient-to-r from-rose-500 to-purple-500'
              }`}>
                <span className="text-white text-xl">🌸</span>
              </div>
              <div>
                <h3 className={`font-bold text-lg ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                  Women Support NGO
                </h3>
                <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                  Akola | Pan India
                </p>
              </div>
            </div>
            <p className={`text-sm leading-relaxed mb-4 ${
              isDarkMode ? 'text-purple-200' : 'text-gray-600'
            }`}>
              Under Human Rights Jan Kalyan Jan Seva Mandal, we provide comprehensive support 
              to women facing challenges across India. Every woman deserves dignity, justice, and hope.
            </p>
            <p className={`text-sm font-medium ${
              isDarkMode ? 'text-rose-300' : 'text-rose-600'
            }`}>
              Mahila President: Aisha Anam
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { name: 'About Us', href: '#about' },
                { name: 'Our Services', href: '#services' },
                { name: 'Who We Help', href: '#who-we-help' },
                { name: 'Our Impact', href: '#impact' },
                { name: 'Gallery', href: '#gallery' },
                { name: 'Contact Us', href: '#contact' }
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className={`text-sm transition-colors hover:underline ${
                      isDarkMode 
                        ? 'text-purple-200 hover:text-rose-300' 
                        : 'text-gray-600 hover:text-rose-600'
                    }`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Contact Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <span className="text-sm">📞</span>
                <span className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                  +91 9552542091
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">📧</span>
                <span className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                  support@womensupportngo.org
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">📍</span>
                <span className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                  Akola, Maharastra, India
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm">💬</span>
                <a
                  href="https://wa.me/919552542091"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-sm transition-colors hover:underline ${
                    isDarkMode 
                      ? 'text-green-300 hover:text-green-200' 
                      : 'text-green-600 hover:text-green-700'
                  }`}
                >
                  WhatsApp Support
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Numbers */}
        <div className={`mt-8 pt-8 border-t ${
          isDarkMode ? 'border-purple-700/50' : 'border-rose-200/50'
        }`}>
          <div className="text-center">
            <h4 className={`font-semibold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
              Emergency Helplines
            </h4>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="tel:100"
                className="px-4 py-2 bg-gradient-to-r from-red-500 to-rose-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
              >
                Police: 100
              </a>
              <a
                href="tel:1091"
                className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
              >
                Women Helpline: 1091
              </a>
              <a
                href="tel:181"
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-medium rounded-full hover:shadow-lg transition-all duration-300"
              >
                Women Helpline: 181
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={`mt-8 pt-8 border-t text-center ${
          isDarkMode ? 'border-purple-700/50' : 'border-rose-200/50'
        }`}>
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
              © 2024 Women Support & Empowerment NGO. All rights reserved.
            </p>
            <div className="flex items-center space-x-6">
              <span className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                Made with ❤️ for women empowerment
              </span>
            </div>
          </div>
          
          <div className="mt-4">
            <p className={`text-xs ${isDarkMode ? 'text-purple-300' : 'text-gray-500'}`}>
              Under: Human Rights Jan Kalyan Jan Seva Mandal | 
              Registered NGO supporting women across India
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
