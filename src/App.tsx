import Palette from "./components/Pallete/pallete";
import "./App.css";
import { seedColors } from "./assets/seedColors";

function App() {
  return (
    <div className="App">
      <Palette seedColor={seedColors[1]} />
    </div>
  );
}

export default App;
