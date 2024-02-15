import React from "react";
import { useState } from "react";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker, ColorResult } from "react-color";
import { Button, Divider } from "@mui/material";
import Typography from "@mui/material/Typography";
import { Color } from "../NewPalette/newPalette";
import { hexToRgb, RGBToHSL } from "../../helpers/colortConverter";
import { SeedColor } from "../../models/SeedColor";

interface ColorPickerForm {
  paletteIsFull: boolean;
  currentColor: ColorResult;
  colors: Color[];
  palettes: SeedColor[];
  setCurrentColor: (currentColor: ColorResult) => void;
  setColors: (colors: Color[]) => void;
}

const ColorPickerForm = ({
  paletteIsFull,
  currentColor,
  colors,
  palettes,
  setCurrentColor,
  setColors
}: ColorPickerForm) => {
  const [newName, setNewName] = useState<string>("");
  ValidatorForm.addValidationRule("isColorNameUnique", value =>
    colors.every(({ name }) => name?.toLowerCase() !== value.toLowerCase())
  );

  ValidatorForm.addValidationRule("isColorUnique", value =>
    colors.every(({ color }) => color !== currentColor)
  );

  const updateCurrentColor = (currentColor: ColorResult) => {
    setCurrentColor(currentColor);
  };

  const addColorName = (e: React.FormEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
  };

  const addRandomColor = () => {
    const allColors = palettes.map(p => p.colors).flat();
    let color = Math.floor(Math.random() * allColors.length);
    const randomColor = allColors[color];
    const newColor: Color = {
      color: {
        hex: randomColor.color,
        rgb: hexToRgb(randomColor.color),
        hsl: RGBToHSL(hexToRgb(randomColor.color))
      },
      name: randomColor.name
    };
    setColors([...colors, newColor]);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newName
    };
    setColors([...colors, newColor]);
    setNewName("");
  };

  const clearColors = () => {
    setColors([]);
  };

  return (
    <div>
      <Typography variant="h4">Design your pallete</Typography>
      <Button variant="contained" color="secondary" onClick={clearColors}>
        Clear Palette Button
      </Button>
      <Button variant="contained" color="primary" onClick={addRandomColor} disabled={paletteIsFull}>
        Random color
      </Button>
      <Divider />
      <ChromePicker color={currentColor.hex} onChangeComplete={updateCurrentColor} />
      <ValidatorForm onSubmit={addNewColor}>
        <TextValidator
          name="Color name"
          value={newName}
          onChange={addColorName}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={[
            "This field is required",
            "Color name must be unique",
            "Color already used"
          ]}
        />
        <Button
          variant="contained"
          type="submit"
          color="primary"
          disabled={paletteIsFull}
          style={{ backgroundColor: paletteIsFull ? "grey" : currentColor?.hex }}
        >
          {paletteIsFull ? "Palette Full" : "Add Color"}
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ColorPickerForm;
