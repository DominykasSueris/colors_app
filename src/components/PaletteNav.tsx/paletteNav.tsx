import { Dispatch, SetStateAction, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "../AppBar/appBar";
import { SeedColor } from "../../models/SeedColor";
import { Color } from "../NewPalette/newPalette";
import "./paletteNav.scss";
interface PaletteNavProps {
  open: boolean;
  palettes: SeedColor[];
  colors: Color[];
  handleDrawerOpen: () => void;
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
}

const PaletteNav = ({ open, palettes, colors, handleDrawerOpen, setPalettes }: PaletteNavProps) => {
  const navigate = useNavigate();
  const [paletteName, setPaletteName] = useState<string>("");

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

  const handleChangePaletteName = (e: React.FormEvent<HTMLInputElement>) => {
    setPaletteName(e.currentTarget.value);
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" color="default" open={open}>
        <div className="appBar">
          <div className="icon">
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
            </Toolbar>
            <div className="title">
              <Typography variant="h6" noWrap component="div">
                Create a Palette
              </Typography>
            </div>
          </div>
          <div className="nav-tab">
            <div className="validator-form">
              <ValidatorForm
                onSubmit={() => saveNewPalette(paletteName)}
                style={{ display: "flex" }}
              >
                <TextValidator
                  label="PalleteName"
                  value={paletteName}
                  name="newPalleteName"
                  onChange={handleChangePaletteName}
                  // fix validation
                  errorMessages={["Enter Palette Name", "Name already used"]}
                />
                <Button variant="contained" color="primary" type="submit">
                  Save Palette
                </Button>
              </ValidatorForm>
            </div>
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default PaletteNav;