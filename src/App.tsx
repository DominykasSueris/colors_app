import Palette from "./components/Palette/palette";
import { Route, Routes, Router } from "react-router-dom";
import PaletteList from "./components/PaletteList/paletteList";
import { seedColors } from "./assets/seedColors";
import { generatePalette } from "./colorHelpers";
import { SeedColor } from "./models/SeedColor";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Palette seedColor={seedColors[1]} /> */}
      <Routes>
        <Route path="/" element={<PaletteList palettes={seedColors} />}></Route>
        <Route path="/palette/:id" element={<Palette />}></Route>
      </Routes>
    </div>
  );
}

export default App;
