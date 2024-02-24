import { Dispatch, SetStateAction, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ColorResult } from "react-color";
import DraggableColorList from "../DraggableColorList/DraggableColorList";
import { SeedColor } from "../../models/SeedColor";
import { arrayMove } from "react-sortable-hoc";
import { colorToColorResult } from "../../helpers/colortConverter";
import PaletteNav from "../PaletteNav.tsx/paletteNav";
import { drawerWidth } from "../AppBar/appBar";
import ColorPickerForm from "../ColorPickerForm/colorPickerForm";
import "./newPalette.scss";

const Main = styled("main", { shouldForwardProp: prop => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: 0,
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
  flexDirection: "row",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

const NewPalette = ({ palettes, setPalettes }: NewPaletteProps) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [currentColor, setCurrentColor] = useState<ColorResult>({
    hex: "#A02C2C",
    hsl: { h: 0, s: 57, l: 40, a: 1 },
    rgb: { r: 160, g: 44, b: 44, a: 1 }
  });
  const [colors, setColors] = useState<Color[]>(
    palettes[0].colors.map(color => colorToColorResult(color))
  );

  const maxColors = 20;
  const paletteIsFull = colors.length >= maxColors;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const removeCurrentColor = (currentColor: ColorResult) => {
    setColors(colors.filter(color => color.color !== currentColor));
  };

  const onSortEnd = ({ oldIndex, newIndex }: { oldIndex: number; newIndex: number }) => {
    setColors(colors => arrayMove(colors, oldIndex, newIndex));
  };

  return (
    <Box sx={{ display: "flex" }}>
      <PaletteNav
        open={open}
        palettes={palettes}
        colors={colors}
        handleDrawerOpen={handleDrawerOpen}
        setPalettes={setPalettes}
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
        <div className="drawer">
          <ColorPickerForm
            paletteIsFull={paletteIsFull}
            currentColor={currentColor}
            palettes={palettes}
            colors={colors}
            setCurrentColor={setCurrentColor}
            setColors={setColors}
          />
        </div>
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
