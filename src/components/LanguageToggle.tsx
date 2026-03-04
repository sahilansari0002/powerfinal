import { useTranslation } from 'react-i18next';

interface LanguageToggleProps {
  isDarkMode: boolean;
}

export function LanguageToggle({ isDarkMode }: LanguageToggleProps) {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'mr' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`flex items-center space-x-2 px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 ${
        isDarkMode 
          ? 'bg-purple-800 text-purple-200 hover:bg-purple-700 border border-purple-600/30' 
          : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
      }`}
      title={i18n.language === 'en' ? 'Switch to Marathi' : 'Switch to English'}
    >
      <span className="text-base">
        {i18n.language === 'en' ? '🇮🇳' : '🇬🇧'}
      </span>
      <span className="font-semibold">
        {i18n.language === 'en' ? 'मराठी' : 'EN'}
      </span>
    </button>
  );
}