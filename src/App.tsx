import * as React from "react";
import Palette from "./components/Palette/palette";
import { Route, Routes } from "react-router-dom";
import PaletteList from "./components/PaletteList/paletteList";
import { seedColors } from "./assets/seedColors";
import SingleColorPalette from "./components/SingleColorPalette/singleColorPalette";
import NewPalette from "./components/NewPalette/newPalette";
import { SeedColor } from "./models/SeedColor";
import "./App.css";

function App() {
  let savedPalettes = window.localStorage.getItem("palettes");
  const [palettes, setPalettes] = React.useState<SeedColor[]>(
    savedPalettes ? JSON.parse(savedPalettes) : seedColors
  );

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<PaletteList palettes={palettes} setPalettes={setPalettes} />}
        ></Route>
        <Route
          path="/palette/newPalette"
          element={<NewPalette palettes={palettes} setPalettes={setPalettes} />}
        ></Route>
        <Route path="/palette/:id" element={<Palette palettes={palettes} />}></Route>
        <Route
          path="/palette/:paletteId/color/:colorName"
          element={<SingleColorPalette palettes={palettes} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
