import Palette from "./components/pallete";
import "./App.css";
import { seedColors } from "./assets/seedColors";

function App() {
  return (
    <div className="App">
      <Palette colors={seedColors} />
    </div>
  );
}

export default App;
