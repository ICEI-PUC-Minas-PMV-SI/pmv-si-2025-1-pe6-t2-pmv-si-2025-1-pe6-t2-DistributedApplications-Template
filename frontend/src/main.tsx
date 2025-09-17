import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import MobileApp from './MobileApp.tsx'
import './index.css'
import { Capacitor } from '@capacitor/core';
import './mobile-styles.css';

const isNative = Capacitor.isNativePlatform();

const AppComponent = isNative ? MobileApp : App;

createRoot(document.getElementById("root")!).render(<AppComponent />);