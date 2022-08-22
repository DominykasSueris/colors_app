import Palette from "./components/Pallete/pallete";
import { Route, Routes, Router } from "react-router-dom";
import { seedColors } from "./assets/seedColors";
import { generatePalette } from "./colorHelpers";
import { SeedColor } from "./models/SeedColor";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* <Palette seedColor={seedColors[1]} /> */}
      <Routes>
        <Route path="/"></Route>
        <Route path="/palette/:id" element={<Palette />}></Route>
      </Routes>
    </div>
  );
}

export default App;
