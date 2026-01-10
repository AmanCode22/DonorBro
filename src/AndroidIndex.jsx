import { useEffect, useState } from "react";
import { M3 } from "tauri-plugin-m3"; 

function Index() {
  const [colors, setColors] = useState(null);

  useEffect(() => {
    async function initTheme() {
      try {
        let colorScheme = await M3.getColors("system");
        setColors(colorScheme);

        let isSuccess = await M3.applyColors("light");
        console.log(isSuccess);
        
      } catch (error) {
        console.error(error);
      }
    }

    initTheme();
  }, []); 

  return (<>
    <button style={{ backgroundColor: colors?.primary || 'green' }}>
      Hello
    </button>
<button>Ok</button></>
  );
}

export default Index;