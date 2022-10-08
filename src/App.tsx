import Palette from "./components/Palette/palette";
import { Route, Routes } from "react-router-dom";
import PaletteList from "./components/PaletteList/paletteList";
import { seedColors } from "./assets/seedColors";
import SingleColorPalette from "./components/SingleColorPalette/singleColorPalette";
import NewPalette from "./components/NewPalette/newPalette";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<PaletteList palettes={seedColors} />}></Route>
        <Route path="/palette/newPalette" element={<NewPalette />}></Route>
        <Route path="/palette/:id" element={<Palette />}></Route>
        <Route path="/palette/:paletteId/color/:colorName" element={<SingleColorPalette />}></Route>
      </Routes>
    </div>
  );
}

export default App;
