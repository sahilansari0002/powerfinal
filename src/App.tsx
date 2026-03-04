import { Authenticated, Unauthenticated } from "convex/react";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Leadership } from "./components/Leadership";
import { Services } from "./components/Services";
import { WhoWeHelp } from "./components/WhoWeHelp";
import { Impact } from "./components/Impact";
import { Gallery } from "./components/Gallery";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { Loader } from "./components/Loader";
import { Navigation } from "./components/Navigation";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check for saved theme preference or default to light mode
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000); // Reduced loading time for better UX

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900' 
        : 'bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50'
    }`}>
      <Navigation isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      
      <main>
        <Hero isDarkMode={isDarkMode} />
        <About isDarkMode={isDarkMode} />
        <Leadership isDarkMode={isDarkMode} />
        <Services isDarkMode={isDarkMode} />
        <WhoWeHelp isDarkMode={isDarkMode} />
        <Impact isDarkMode={isDarkMode} />
        <Gallery isDarkMode={isDarkMode} />
        <Contact isDarkMode={isDarkMode} />
      </main>
      
      <Footer isDarkMode={isDarkMode} />
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: isDarkMode ? '#1f2937' : '#ffffff',
            color: isDarkMode ? '#f3f4f6' : '#1f2937',
            border: isDarkMode ? '1px solid #374151' : '1px solid #e5e7eb',
          },
        }}
      />
    </div>
  );
}
