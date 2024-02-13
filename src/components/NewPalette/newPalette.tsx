import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import { Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker, ColorResult } from "react-color";
import DraggableColorList from "../DraggableColorList/DraggableColorList";
import "./newPalette.scss";
import { useNavigate } from "react-router";
import { SeedColor } from "../../models/SeedColor";
import { Dispatch, SetStateAction } from "react";
import { arrayMove } from "react-sortable-hoc";
import { colorToColorResult, hexToRgb, RGBToHSL } from "../../helpers/colortConverter";
import PaletteNav from "../PaletteNav.tsx/paletteNav";
import { drawerWidth } from "../AppBar/appBar";

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  })
}));
export interface Color {
  color: ColorResult;
  name: string;
}
interface NewPalette {
  paletteName?: string;
  colors?: Color[];
}

interface NewPaletteProps extends NewPalette {
  palettes: SeedColor[];
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
}

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

const NewPalette = ({ palettes, setPalettes }: NewPaletteProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [currentColor, setCurrentColor] = React.useState<ColorResult>({
    hex: "#A02C2C",
    hsl: { h: 0, s: 57, l: 40, a: 1 },
    rgb: { r: 160, g: 44, b: 44, a: 1 }
  });
  const [colors, setColors] = React.useState<Color[]>(
    palettes[0].colors.map(color => colorToColorResult(color))
  );
  const [newName, setNewName] = React.useState<string>("");
  const [paletteName, setPaletteName] = React.useState<string>("");

  ValidatorForm.addValidationRule("isColorNameUnique", value =>
    colors.every(({ name }) => name?.toLowerCase() !== value.toLowerCase())
  );

  ValidatorForm.addValidationRule("isColorUnique", value =>
    colors.every(({ color }) => color !== currentColor)
  );

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (currentColor: ColorResult) => {
    setCurrentColor(currentColor);
  };

  const addNewColor = () => {
    const newColor = {
      color: currentColor,
      name: newName
    };
    setColors([...colors, newColor]);
    setNewName("");
  };

  const removeCurrentColor = (currentColor: ColorResult) => {
    setColors(colors.filter(color => color.color !== currentColor));
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setColors(colors => arrayMove(colors, oldIndex, newIndex));
  };

  const handleNewNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
  };

  const clearColors = () => {
    setColors([]);
  };

  const handleChangePaletteName = (e: React.FormEvent<HTMLInputElement>) => {
    setPaletteName(e.currentTarget.value);
    console.log(paletteName);
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
    console.log(allColors);
    setColors([...colors, newColor]);
  };

  const saveNewPalette = (paletteName: string) => {
    const newPalette: SeedColor = {
      paletteName: paletteName,
      colors: colors.map(color => ({
        name: color.name,
        color: color.color.hex
      })),
      id: paletteName.toLocaleLowerCase().replace(/ /g, "-"),
      emoji: "🎨"
    };
    setPalettes([...palettes, newPalette]);
    navigate("/");
  };

  const maxColors = 20;

  const paletteIsFull = colors.length >= maxColors;

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        saveNewPalette={saveNewPalette}
        handleChangePaletteName={handleChangePaletteName}
        paletteName={paletteName}
      />
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Typography variant="h4">Design your pallete</Typography>
        <Button variant="contained" color="secondary" onClick={clearColors}>
          Clear Palette Button
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={addRandomColor}
          disabled={paletteIsFull}
        >
          Random color
        </Button>
        <ChromePicker color={currentColor.hex} onChangeComplete={updateCurrentColor} />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            name="Color name"
            value={newName}
            onChange={handleNewNameChange}
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
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <main className="new-palette-main">
          <DraggableColorList
            colors={colors}
            removeCurrentColor={removeCurrentColor}
            axis="xy"
            onSortEnd={onSortEnd}
          />
        </main>
      </Main>
    </Box>
  );
};

export default NewPalette;
