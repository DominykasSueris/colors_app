import Palette from "./components/Pallete/pallete";
import "./App.css";
import { seedColors } from "./assets/seedColors";
import { generatePalette } from "./colorHelpers";

function App() {
  console.log(generatePalette(seedColors[2]));
  return (
    <div className="App">
      <Palette seedColor={seedColors[1]} />
    </div>
  );
}

export default App;
