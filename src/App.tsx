import * as React from "react";
import Palette from "./components/Palette/palette";
import { Route, Routes, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PaletteList from "./components/PaletteList/paletteList";
import { seedColors } from "./assets/seedColors";
import SingleColorPalette from "./components/SingleColorPalette/singleColorPalette";
import NewPalette from "./components/NewPalette/newPalette";
import { SeedColor } from "./models/SeedColor";
import NotFound from "./components/NotFound/notFound";
import "./App.scss";

function App() {
  let savedPalettes = window.localStorage.getItem("palettes");
  const [palettes, setPalettes] = React.useState<SeedColor[]>(
    savedPalettes ? JSON.parse(savedPalettes) : seedColors
  );

  const location = useLocation();

  return (
    <div className="App">
      <TransitionGroup>
        <CSSTransition key={location.pathname} classNames="fade" timeout={500}>
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
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CSSTransition>
      </TransitionGroup>
    </div>
  );
}

export default App;
