import { useEffect, useState } from "react";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';
import { platform } from "@tauri-apps/plugin-os";
import {Index as Index_Android} from "./AndroidIndex.jsx";
import {Index} from "./OtherIndex.jsx";

function App() {
  const currentPlatform = platform();
  
  
  const [loading, setLoading] = useState(true);
  
  const [isDarkMode, setIsDarkMode] = useState(
    typeof window !== 'undefined' && window.matchMedia 
      ? window.matchMedia('(prefers-color-scheme: dark)').matches 
      : false
  );

  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

 
  useEffect(() => {
    const initApp = async () => {
      // Here load heavy things then comment below as after it only splash would be loaded
      await new Promise(resolve => setTimeout(resolve, 20));

      const appWindow = getCurrentWindow();
      
     
      await appWindow.show();
      await appWindow.setFocus();

      
      try {
        const splashWindow = await WebviewWindow.getByLabel('splash');
        if (splashWindow) {
          await splashWindow.close();
        }
      } catch (err) {
        console.warn("Splash window not found or already closed");
      }

      setLoading(false);
    };

    initApp();
  }, []);

  
  if (loading) {
    return (
      <div
        style={{
          margin: 0,
          padding: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          backgroundColor: isDarkMode ? '#121212' : '#ffffff',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
          WebkitFontSmoothing: 'antialiased',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          cursor: 'wait',
          userSelect: 'none',
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 'clamp(10px, 2vh, 20px)',
            opacity: 1,
            transform: 'none',
          }}
        >
          <img
            src="app-icon.png"
            alt="DonorBro"
            style={{
              width: 'clamp(64px, 20vmin, 120px)',
              height: 'clamp(64px, 20vmin, 120px)',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))',
            }}
          />

          <div>
            <h1
              style={{
                margin: 0,
                fontSize: 'clamp(1.5rem, 5vw, 2.5rem)',
                fontWeight: 700,
                color: isDarkMode ? '#f8fafc' : '#0f172a',
                letterSpacing: '-0.02em',
                lineHeight: 1.1,
              }}
            >
              DonorBro
            </h1>
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(0.875rem, 2.5vw, 1rem)',
                fontWeight: 500,
                color: isDarkMode ? '#94a3b8' : '#64748b',
                letterSpacing: '0.01em',
              }}
            >
              Please Wait For Few More Seconds...
            </p>
          </div>
        </div>
      </div>
    );
  }

  
  if (platform=="android") {
    return <Index2></Index2>
  }
  else{
    return <Index></Index>
  }
}

export default App;