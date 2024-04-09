// Import the functions you need from the SDKs you need
import { initializeApp, getApps, FirebaseOptions, getApp } from 'firebase/app';

// Initialize Firebase
export const init = (firebaseConfig: FirebaseOptions, appName?: string) => {
  const apps = getApps();

  if (appName) {
    try {
      const app = getApp(appName);

      return app;
    } catch {
      return initializeApp(firebaseConfig, appName);
    }
  } else {
    if (apps.length === 0) {
      return initializeApp(firebaseConfig);
    }
  }
};
