import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { Button } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { ChromePicker, ColorResult } from "react-color";
import DraggableColorBox from "../DraggableColorBox/DraggableColorBox";
import "./newPalette.scss";
import { useNavigate } from "react-router";
import { SeedColor } from "../../models/SeedColor";
import { Dispatch, SetStateAction } from "react";
import { generatePalette } from "../../assets/colorHelpersTs";

const drawerWidth = 400;

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

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

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

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== "open"
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

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
  const [colors, setColors] = React.useState<Color[]>([]);
  const [newName, setNewName] = React.useState<string>("");

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

  const handleNewNameChange = (e: React.FormEvent<HTMLInputElement>) => {
    setNewName(e.currentTarget.value);
  };

  const saveNewPalette = () => {
    let newName = "New test Palette";
    const newPalette: SeedColor = {
      paletteName: newName,
      colors: colors.map(color => ({
        name: color.name,
        color: color.color.hex
      })),
      id: newName.toLocaleLowerCase().replace(/ /g, "-"),
      emoji: "🎨"
    };
    setPalettes([...palettes, newPalette]);
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" color="default" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Persistent drawer
          </Typography>
          <Button variant="contained" color="primary" onClick={saveNewPalette}>
            Save Palette
          </Button>
        </Toolbar>
      </AppBar>
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
        <Button variant="contained" color="secondary">
          Clear Palette Button
        </Button>
        <Button variant="contained" color="primary">
          Random color
        </Button>
        <ChromePicker color={currentColor.hex} onChangeComplete={updateCurrentColor} />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator
            name="test"
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
            style={{ backgroundColor: currentColor?.hex }}
          >
            Add color
          </Button>
        </ValidatorForm>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <main className="new-palette-main">
          {colors.map(color => (
            <DraggableColorBox
              key={color.name}
              color={color}
              removeCurrentColor={() => removeCurrentColor(color.color)}
            />
          ))}
        </main>
      </Main>
    </Box>
  );
};

export default NewPalette;
