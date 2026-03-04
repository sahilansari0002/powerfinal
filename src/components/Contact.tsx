import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";
import { useTranslation } from 'react-i18next';
import useWeb3Form from '@web3forms/react';

interface ContactProps {
  isDarkMode: boolean;
}

export function Contact({ isDarkMode }: ContactProps) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: '',
    city: '',
    phone: '',
    problemDescription: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [phpBackendStatus, setPhpBackendStatus] = useState<'unknown' | 'connected' | 'disconnected'>('unknown');

  const submitContact = useMutation(api.contacts.submitContact);

  // Web3Forms integration
  const { submit: submitWeb3Form } = useWeb3Form({
    access_key: "YOUR_WEB3FORMS_ACCESS_KEY", // Replace with your actual access key
    settings: {
      from_name: "Women Support NGO Contact Form",
      subject: "New Help Request from Website",
    },
    onSuccess: (message, data) => {
      console.log('Web3Form success:', message);
    },
    onError: (message, data) => {
      console.error('Web3Form error:', message);
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.city || !formData.phone || !formData.problemDescription) {
      toast.error(t('common.fillAllFields'));
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Submit to Convex database
      await submitContact(formData);
      
      // Submit to PHP backend database
      try {
        const phpResponse = await fetch('http://localhost/php-backend/api/help_request.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            city: formData.city,
            phone: formData.phone,
            problemDescription: formData.problemDescription
          })
        });
        
        if (phpResponse.ok) {
          const phpResult = await phpResponse.json();
          console.log('Data saved to PHP database:', phpResult);
          setPhpBackendStatus('connected');
        } else {
          console.warn('PHP backend submission failed');
          setPhpBackendStatus('disconnected');
        }
      } catch (phpError) {
        console.warn('PHP backend not available:', phpError);
        setPhpBackendStatus('disconnected');
      }
      
      // Submit to Web3Forms for email notification
      const web3FormData = {
        name: formData.name,
        city: formData.city,
        phone: formData.phone,
        message: formData.problemDescription,
        priority: getPriority(formData.problemDescription),
        timestamp: new Date().toLocaleString(),
      };
      
      await submitWeb3Form(web3FormData);
      
      const successMessage = phpBackendStatus === 'connected' 
        ? 'Message sent successfully! Data saved to both cloud and local database.'
        : 'Message sent successfully! Data saved to cloud database.';
      
      toast.success(successMessage);
      setFormData({ name: '', city: '', phone: '', problemDescription: '' });
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error(t('common.messageFailed'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriority = (description: string) => {
    const emergencyKeywords = ["abuse", "violence", "threat", "danger", "emergency", "urgent"];
    const highPriorityKeywords = ["harassment", "divorce", "legal", "court", "police"];
    
    const lowerDesc = description.toLowerCase();
    if (emergencyKeywords.some(keyword => lowerDesc.includes(keyword))) {
      return "EMERGENCY";
    } else if (highPriorityKeywords.some(keyword => lowerDesc.includes(keyword))) {
      return "HIGH";
    }
    return "MEDIUM";
  };

  const testPhpConnection = async () => {
    try {
      const response = await fetch('http://localhost/php-backend/api/test.php');
      const result = await response.json();
      console.log('PHP Backend Test Result:', result);
      setPhpBackendStatus('connected');
      toast.success('PHP Backend is connected!');
    } catch (error) {
      console.error('PHP Backend Test Failed:', error);
      setPhpBackendStatus('disconnected');
      toast.error('PHP Backend connection failed. Make sure XAMPP is running.');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section 
      id="contact" 
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
            {t('contact.title')}
          </h2>
          
          <div className={`w-20 h-1 rounded-full mx-auto mb-8 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-rose-400 to-purple-400' 
              : 'bg-gradient-to-r from-rose-500 to-purple-500'
          }`} />
          
          <p className={`text-xl max-w-3xl mx-auto ${
            isDarkMode ? 'text-purple-200' : 'text-gray-700'
          }`}>
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className={`p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
            isDarkMode 
              ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
              : 'bg-white/80 border border-rose-200/50 hover:bg-white/90'
          }`}>
            <div className="mb-8">
              <h3 className={`text-2xl font-bold mb-4 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                {t('contact.formTitle')}
              </h3>
              <p className={`text-base ${
                isDarkMode ? 'text-purple-200' : 'text-gray-600'
              }`}>
                {t('contact.formSubtitle')}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="group">
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-purple-200 group-focus-within:text-rose-300' : 'text-gray-700 group-focus-within:text-rose-600'
                }`}>
                  {t('contact.name')} *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-rose-400 focus:border-transparent focus:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-white/10 border-purple-400/30 text-white placeholder-purple-300' 
                      : 'bg-white border-rose-200 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder={t('contact.name')}
                  required
                />
              </div>

              <div className="group">
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-purple-200 group-focus-within:text-rose-300' : 'text-gray-700 group-focus-within:text-rose-600'
                }`}>
                  {t('contact.city')} *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-rose-400 focus:border-transparent focus:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-white/10 border-purple-400/30 text-white placeholder-purple-300' 
                      : 'bg-white border-rose-200 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder={t('contact.city')}
                  required
                />
              </div>

              <div className="group">
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-purple-200 group-focus-within:text-rose-300' : 'text-gray-700 group-focus-within:text-rose-600'
                }`}>
                  {t('contact.phone')} *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-rose-400 focus:border-transparent focus:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-white/10 border-purple-400/30 text-white placeholder-purple-300' 
                      : 'bg-white border-rose-200 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder={t('contact.phone')}
                  required
                />
              </div>

              <div className="group">
                <label className={`block text-sm font-medium mb-2 transition-colors ${
                  isDarkMode ? 'text-purple-200 group-focus-within:text-rose-300' : 'text-gray-700 group-focus-within:text-rose-600'
                }`}>
                  {t('contact.description')} *
                </label>
                <textarea
                  name="problemDescription"
                  value={formData.problemDescription}
                  onChange={handleInputChange}
                  rows={5}
                  className={`w-full px-4 py-3 rounded-xl border transition-all duration-300 focus:ring-2 focus:ring-rose-400 focus:border-transparent resize-none focus:scale-[1.02] ${
                    isDarkMode 
                      ? 'bg-white/10 border-purple-400/30 text-white placeholder-purple-300' 
                      : 'bg-white border-rose-200 text-gray-800 placeholder-gray-500'
                  }`}
                  placeholder={t('contact.descriptionPlaceholder')}
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-rose-500 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-rose-500/25 active:scale-95"
              >
                {isSubmitting ? t('contact.sending') : t('contact.send')}
              </button>
              
              {/* PHP Backend Test Button */}
              <button
                type="button"
                onClick={testPhpConnection}
                className="w-full py-2 mt-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm"
              >
                Test PHP Backend Connection
              </button>
              
              {/* PHP Backend Status Indicator */}
              {phpBackendStatus !== 'unknown' && (
                <div className={`mt-2 p-2 rounded-lg text-center text-sm font-medium ${
                  phpBackendStatus === 'connected' 
                    ? 'bg-green-100 text-green-800 border border-green-200' 
                    : 'bg-red-100 text-red-800 border border-red-200'
                }`}>
                  {phpBackendStatus === 'connected' ? '✅ PHP Backend Connected' : '❌ PHP Backend Disconnected'}
                </div>
              )}
            </form>

            <div className={`mt-6 p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-yellow-900/30 border border-yellow-600/30' 
                : 'bg-yellow-50 border border-yellow-200'
            }`}>
              <p className={`text-sm ${
                isDarkMode ? 'text-yellow-200' : 'text-yellow-800'
              }`}>
                🔒 {t('contact.privacy')}
              </p>
            </div>
          </div>

          {/* Contact Information & Quick Actions */}
          <div className="space-y-8">
            {/* Emergency Contact */}
            <div className={`p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-red-900/20 border border-red-400/30 hover:bg-red-900/30' 
                : 'bg-red-50 border border-red-200 hover:bg-red-100'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-rose-600 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 hover:scale-110 hover:rotate-12">
                  <span className="text-white text-xl">🚨</span>
                </div>
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {t('contact.emergency')}
                </h3>
              </div>
              <p className={`text-base mb-4 ${
                isDarkMode ? 'text-red-200' : 'text-red-700'
              }`}>
                {t('contact.emergencyText')}
              </p>
              <div className="space-y-2">
                <a
                  href="tel:100"
                  className="block w-full py-3 bg-gradient-to-r from-red-500 to-rose-600 text-white font-semibold rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  📞 {t('contact.police')}
                </a>
                <a
                  href="tel:1091"
                  className="block w-full py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-semibold rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  📞 {t('contact.womenHelpline')}
                </a>
              </div>
            </div>

            {/* WhatsApp Contact */}
            <div className={`p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-green-900/20 border border-green-400/30 hover:bg-green-900/30' 
                : 'bg-green-50 border border-green-200 hover:bg-green-100'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 hover:scale-110 hover:rotate-12">
                  <span className="text-white text-xl">💬</span>
                </div>
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {t('contact.whatsapp')}
                </h3>
              </div>
              <p className={`text-base mb-4 ${
                isDarkMode ? 'text-green-200' : 'text-green-700'
              }`}>
                {t('contact.whatsappText')}
              </p>
              <a
                href="https://wa.me/919552542091"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl text-center hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
              >
                💬 {t('contact.chatWhatsapp')}
              </a>
            </div>

            {/* Office Contact */}
            <div className={`p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
                : 'bg-white/80 border border-rose-200/50 hover:bg-white/90'
            }`}>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-rose-500 to-purple-600 rounded-full flex items-center justify-center mr-4 transition-transform duration-300 hover:scale-110 hover:rotate-12">
                  <span className="text-white text-xl">🏢</span>
                </div>
                <h3 className={`text-xl font-bold ${
                  isDarkMode ? 'text-white' : 'text-gray-800'
                }`}>
                  {t('contact.office')}
                </h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center group">
                  <span className="text-lg mr-3 transition-transform duration-300 group-hover:scale-125">📍</span>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      Akola, Maharastra
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                      Pan India Operations
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <span className="text-lg mr-3 transition-transform duration-300 group-hover:scale-125">📧</span>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      support@womensupportngo.org
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                      {t('contact.email')}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center group">
                  <span className="text-lg mr-3 transition-transform duration-300 group-hover:scale-125">📞</span>
                  <div>
                    <p className={`font-medium ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                      +91 9552542091
                    </p>
                    <p className={`text-sm ${isDarkMode ? 'text-purple-200' : 'text-gray-600'}`}>
                      {t('contact.helpline')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours */}
            <div className={`p-6 rounded-2xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
              isDarkMode 
                ? 'bg-blue-900/20 border border-blue-400/30 hover:bg-blue-900/30' 
                : 'bg-blue-50 border border-blue-200 hover:bg-blue-100'
            }`}>
              <h4 className={`font-bold mb-3 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                🕒 {t('contact.supportHours')}
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>Emergency:</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{t('contact.emergency24')}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>General Support:</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{t('contact.generalSupport')}</span>
                </div>
                <div className="flex justify-between">
                  <span className={isDarkMode ? 'text-blue-200' : 'text-blue-700'}>Counseling:</span>
                  <span className={isDarkMode ? 'text-white' : 'text-gray-800'}>{t('contact.counselingAppt')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Message */}
        <div className={`mt-16 text-center p-8 rounded-3xl backdrop-blur-md transition-all duration-500 hover:scale-[1.02] ${
          isDarkMode 
            ? 'bg-white/10 border border-purple-400/30 hover:bg-white/15' 
            : 'bg-white/80 border border-rose-200/50 hover:bg-white/90'
        }`}>
          <h3 className={`text-2xl font-bold mb-4 ${
            isDarkMode ? 'text-white' : 'text-gray-800'
          }`}>
            {t('contact.notAlone')}
          </h3>
          <p className={`text-lg ${
            isDarkMode ? 'text-purple-200' : 'text-gray-700'
          }`}>
            {t('contact.notAloneText')}
          </p>
        </div>
      </div>
    </section>
  );
}
