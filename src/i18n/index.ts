import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: "Home",
        about: "About",
        services: "Services",
        impact: "Impact",
        gallery: "Gallery",
        contact: "Contact",
        getHelp: "Get Help Now",
        orgName: "Women Support NGO",
        location: "Akola | Pan India"
      },
      // Hero Section
      hero: {
        title1: "Supporting Every Girl,",
        title2: "Protecting Every Woman",
        subtitle: "From mental harassment to divorce support, from justice to marriage help — we stand with women of all ages, across India.",
        orgFull: "Women Support & Empowerment NGO – Akola (Pan India)",
        under: "Under: Human Rights Jan Kalyan Jan Seva Mandal",
        president: "Mahila President: Aisha Anam",
        getHelp: "Get Help Now",
        contact: "Contact Us",
        donate: "Donate / Support",
        keywords: {
          justice: "Justice",
          care: "Care",
          protection: "Protection",
          empowerment: "Empowerment",
          hope: "Hope",
          dignity: "Dignity"
        }
      },
      // About Section
      about: {
        title: "Who We Are",
        description1: "We are a women-focused NGO based in Surat, working across India under",
        organization: "Human Rights Jan Kalyan Jan Seva Mandal",
        description2: "We support girls and women facing divorce, mental harassment, domestic problems, and social injustice.",
        description3: "We also help poor girls with marriage support.",
        ageBarrier: "Age is never a barrier — if a woman needs help, we are here.",
        vision: "Our Vision",
        visionText: "A society where every woman feels safe, empowered, and supported. Where justice is accessible, dignity is preserved, and hope never fades.",
        womenHelped: "Women Helped",
        statesCovered: "States Covered",
        mission: {
          protection: "Protection from harassment and abuse",
          legal: "Legal support and guidance",
          marriage: "Marriage support for underprivileged girls",
          counseling: "Emotional counseling and care",
          empowerment: "Pan-India women empowerment"
        }
      },
      // Services
      services: {
        title: "Our Services",
        subtitle: "Comprehensive support services designed to empower, protect, and uplift women across all walks of life.",
        divorce: {
          title: "Divorce & Family Dispute Support",
          description: "Legal guidance and emotional support for women going through divorce and family conflicts."
        },
        harassment: {
          title: "Mental Harassment & Abuse Help",
          description: "Immediate support and protection for women facing mental, emotional, or physical abuse."
        },
        rights: {
          title: "Women Rights Guidance",
          description: "Education and advocacy about women's legal rights and how to exercise them effectively."
        },
        counseling: {
          title: "Emotional & Counseling Support",
          description: "Professional counseling services to help women heal and rebuild their confidence."
        },
        marriage: {
          title: "Marriage Help for Poor Girls",
          description: "Financial and social support to help underprivileged girls with marriage arrangements."
        },
        emergency: {
          title: "Emergency Support & Guidance",
          description: "24/7 emergency helpline and immediate assistance for women in crisis situations."
        },
        needHelp: "Need Immediate Help?",
        needHelpText: "Don't wait. Reach out to us now for confidential support and guidance.",
        emergencyCall: "Emergency Call"
      },
      // Contact
      contact: {
        title: "Get Help & Support",
        subtitle: "Reach out to us confidentially. Every conversation is private, every concern is valid, and every woman deserves support.",
        formTitle: "Share Your Concern",
        formSubtitle: "All information is kept strictly confidential. We're here to listen and help.",
        name: "Your Name",
        city: "City",
        phone: "Phone Number",
        description: "Describe Your Situation",
        descriptionPlaceholder: "Please describe your situation. The more details you provide, the better we can help you.",
        send: "Send Message",
        sending: "Sending...",
        privacy: "Your privacy is our priority. All communications are confidential and secure.",
        emergency: "Emergency Help",
        emergencyText: "If you're in immediate danger, please call:",
        police: "Police: 100",
        womenHelpline: "Women Helpline: 1091",
        whatsapp: "WhatsApp Support",
        whatsappText: "Chat with us privately on WhatsApp for immediate support.",
        chatWhatsapp: "Chat on WhatsApp",
        office: "Office Contact",
        email: "Email Support",
        helpline: "24/7 Helpline",
        supportHours: "Support Hours",
        emergency24: "24/7 Available",
        generalSupport: "9 AM - 9 PM",
        counselingAppt: "By Appointment",
        notAlone: "Remember: You Are Not Alone",
        notAloneText: "Every step towards seeking help is a step towards healing. We believe in your strength and are here to support your journey."
      },
      // Common
      common: {
        loading: "Loading...",
        fillAllFields: "Please fill in all fields",
        messageSent: "Your message has been sent. We will contact you soon.",
        messageFailed: "Failed to send message. Please try again."
      }
    }
  },
  mr: {
  translation: {
    // Navigation
    nav: {
      home: "मुख्यपृष्ठ",
      about: "आमच्याबद्दल",
      services: "सेवा",
      impact: "परिणाम",
      gallery: "गॅलरी",
      contact: "संपर्क",
      getHelp: "आता मदत घ्या",
      orgName: "महिला सहाय्य एनजीओ",
      location: "अकोला | संपूर्ण भारत"
    },

    // Hero Section
    hero: {
      title1: "प्रत्येक मुलीला आधार,",
      title2: "प्रत्येक महिलेचे संरक्षण",
      subtitle: "मानसिक छळापासून घटस्फोट सहाय्यापर्यंत, न्यायापासून विवाह सहाय्यापर्यंत — आम्ही संपूर्ण भारतातील सर्व वयोगटातील महिलांसोबत आहोत.",
orgFull: "महिला सहाय्य आणि सक्षमीकरण एनजीओ – अकोला (संपूर्ण भारत)",
under: "अंतर्गत: मानव अधिकार जन कल्याण जन सेवा मंडळ",
president: "महिला अध्यक्ष: आयशा अनम",
      getHelp: "आता मदत घ्या",
      contact: "आमच्याशी संपर्क साधा",
      donate: "दान / सहाय्य",
      keywords: {
        justice: "न्याय",
        care: "काळजी",
        protection: "संरक्षण",
        empowerment: "सक्षमीकरण",
        hope: "आशा",
        dignity: "सन्मान"
      }
    },

    // About
    about: {
      title: "आम्ही कोण आहोत",
      description1: "आम्ही सुरत येथे स्थित महिला-केंद्रित एनजीओ आहोत, जे संपूर्ण भारतभर कार्य करते.",
      organization: "मानव अधिकार जन कल्याण जन सेवा मंडळ",
      description2: "आम्ही घटस्फोट, मानसिक छळ, कौटुंबिक समस्या आणि सामाजिक अन्यायाचा सामना करणाऱ्या मुली व महिलांना मदत करतो.",
      description3: "आम्ही गरीब मुलींच्या विवाहासाठी देखील मदत करतो.",
      ageBarrier: "वय कधीही अडथळा नाही — जर एखाद्या महिलेला मदतीची गरज असेल तर आम्ही येथे आहोत.",
      vision: "आमचे दृष्टीकोन",
      visionText: "एक असा समाज जिथे प्रत्येक महिला सुरक्षित, सशक्त आणि समर्थित वाटेल. जिथे न्याय सहज उपलब्ध असेल, सन्मान राखला जाईल आणि आशा कधीही संपणार नाही.",
      womenHelped: "मदत केलेल्या महिला",
      statesCovered: "राज्ये",
      mission: {
        protection: "छळ आणि अत्याचारापासून संरक्षण",
        legal: "कायदेशीर सहाय्य आणि मार्गदर्शन",
        marriage: "वंचित मुलींसाठी विवाह सहाय्य",
        counseling: "भावनिक समुपदेशन आणि काळजी",
        empowerment: "संपूर्ण भारतातील महिला सक्षमीकरण"
      }
    },

    // Services
    services: {
      title: "आमच्या सेवा",
      subtitle: "महिलांना सशक्त, सुरक्षित आणि प्रगतीशील बनवण्यासाठी तयार केलेल्या व्यापक सहाय्य सेवा.",
      divorce: {
        title: "घटस्फोट आणि कौटुंबिक वाद सहाय्य",
        description: "घटस्फोट आणि कौटुंबिक संघर्षातून जात असलेल्या महिलांसाठी कायदेशीर मार्गदर्शन आणि भावनिक आधार."
      },
      harassment: {
        title: "मानसिक छळ आणि अत्याचार मदत",
        description: "मानसिक, भावनिक किंवा शारीरिक अत्याचाराचा सामना करणाऱ्या महिलांसाठी तात्काळ मदत आणि संरक्षण."
      },
      rights: {
        title: "महिला हक्क मार्गदर्शन",
        description: "महिलांच्या कायदेशीर हक्कांबद्दल शिक्षण आणि त्यांचा प्रभावी वापर कसा करावा याबद्दल मार्गदर्शन."
      },
      counseling: {
        title: "भावनिक आणि समुपदेशन सहाय्य",
        description: "महिलांना सावरण्यास आणि आत्मविश्वास पुन्हा निर्माण करण्यास मदत करणाऱ्या व्यावसायिक समुपदेशन सेवा."
      },
      marriage: {
        title: "गरीब मुलींसाठी विवाह सहाय्य",
        description: "वंचित मुलींच्या विवाहासाठी आर्थिक आणि सामाजिक मदत."
      },
      emergency: {
        title: "आपत्कालीन सहाय्य आणि मार्गदर्शन",
        description: "आपत्कालीन परिस्थितीत महिलांसाठी 24/7 हेल्पलाइन आणि तात्काळ मदत."
      },
      needHelp: "तुम्हाला तात्काळ मदतीची गरज आहे का?",
      needHelpText: "थांबू नका. गोपनीय सहाय्य आणि मार्गदर्शनासाठी आता आमच्याशी संपर्क साधा.",
      emergencyCall: "आपत्कालीन कॉल"
    },

    // Contact
    contact: {
      title: "मदत आणि सहाय्य मिळवा",
      subtitle: "आमच्याशी गोपनीयपणे संपर्क साधा. प्रत्येक संवाद खाजगी आहे आणि प्रत्येक महिलेला मदतीचा अधिकार आहे.",
      formTitle: "तुमची समस्या सांगा",
      formSubtitle: "सर्व माहिती पूर्णपणे गोपनीय ठेवली जाईल.",
      name: "तुमचे नाव",
      city: "शहर",
      phone: "फोन नंबर",
      description: "तुमची परिस्थिती वर्णन करा",
      descriptionPlaceholder: "कृपया तुमची परिस्थिती सविस्तर सांगा जेणेकरून आम्ही तुम्हाला अधिक चांगली मदत करू शकू.",
      send: "संदेश पाठवा",
      sending: "पाठवत आहे...",
      privacy: "तुमची गोपनीयता आमची प्राथमिकता आहे.",
      emergency: "आपत्कालीन मदत",
      emergencyText: "जर तुम्ही तात्काळ धोक्यात असाल तर कृपया कॉल करा:",
      police: "पोलीस: 100",
      womenHelpline: "महिला हेल्पलाइन: 1091",
      whatsapp: "व्हॉट्सअॅप सहाय्य",
      whatsappText: "तात्काळ मदतीसाठी व्हॉट्सअॅपवर आमच्याशी चॅट करा.",
      chatWhatsapp: "व्हॉट्सअॅपवर चॅट करा",
      office: "ऑफिस संपर्क",
      email: "ईमेल सहाय्य",
      helpline: "24/7 हेल्पलाइन",
      supportHours: "सहाय्य वेळ",
      emergency24: "24/7 उपलब्ध",
      generalSupport: "सकाळी 9 ते रात्री 9",
      counselingAppt: "अपॉइंटमेंटद्वारे",
      notAlone: "लक्षात ठेवा: तुम्ही एकटे नाही",
      notAloneText: "मदत मागण्याचा प्रत्येक पाऊल हे बरे होण्याच्या दिशेने पाऊल आहे."
    },

    // Common
    common: {
      loading: "लोड होत आहे...",
      fillAllFields: "कृपया सर्व फील्ड भरा",
      messageSent: "तुमचा संदेश पाठवला गेला आहे. आम्ही लवकरच संपर्क करू.",
      messageFailed: "संदेश पाठवण्यात अयशस्वी. कृपया पुन्हा प्रयत्न करा."
    }
  }
}
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n;
