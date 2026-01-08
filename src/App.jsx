import { platform } from '@tauri-apps/plugin-os';

function App() {
  const currentPlatform = platform();
  return (<h1>{{currentPlatform}}</h1>);
}
export default App;
