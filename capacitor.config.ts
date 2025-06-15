
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b88e8d2c734049bab4ea5413755016ef',
  appName: 'time-tracker-mobile-first',
  webDir: 'dist',
  server: {
    url: 'https://b88e8d2c-7340-49ba-b4ea-5413755016ef.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#000000',
      showSpinner: false
    }
  }
};

export default config;
