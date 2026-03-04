import { useEffect } from 'react';
import '../i18n';
import App from '../App';

export default function AppWithI18n() {
  useEffect(() => {
    // i18n is initialized when the module is imported
  }, []);

  return <App />;
}
