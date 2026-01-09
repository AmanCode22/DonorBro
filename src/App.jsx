import { useEffect, useState } from "react";
import { getCurrentWindow } from '@tauri-apps/api/window';
import { WebviewWindow } from '@tauri-apps/api/webviewWindow';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // This function handles the window swap
    const initApp = async () => {
      // 1. Simulate a heavy loading task (e.g., fetching user data, connecting to DB)
      // Remove this setTimeout in production and replace with real await calls
      await new Promise(resolve => setTimeout(resolve, 2000));

      // 2. Get the current Main Window
      const appWindow = getCurrentWindow();

      // 3. Show the Main Window
      await appWindow.show();
      await appWindow.setFocus();

      // 4. Find and close the Splash Screen
      // Note: In Tauri v2, we look for the window by the label we set in tauri.conf.json
      const splashWindow = await WebviewWindow.getByLabel('splash');
      if (splashWindow) {
        await splashWindow.close();
      }

      setLoading(false);
    };

    initApp();
  }, []);

  if (loading) {
    // Optional: Render nothing or a skeleton while the splash is still up
    return null; 
  }

  return (
    <div className="container">
      <h1>DonorBro is Ready.</h1>
      <p>System initialized.</p>
    </div>
  );
}

export default App;