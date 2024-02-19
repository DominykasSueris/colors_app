import { Dispatch, SetStateAction, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "../AppBar/appBar";
import { SeedColor } from "../../models/SeedColor";
import { Color } from "../NewPalette/newPalette";
import PaletteMetaForm from "../PaletteMetaForm/paletteMetaForm";
import "./paletteNav.scss";
interface PaletteNav {
  open: boolean;
  palettes: SeedColor[];
  colors: Color[];
  handleDrawerOpen: () => void;
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
}

const PaletteNav = ({ open, palettes, colors, handleDrawerOpen, setPalettes }: PaletteNav) => {
  const [openForm, setOpenForm] = useState<boolean>(false);

  const openPaletteSaveForm = () => {
    setOpenForm(true);
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
            <Button
              className="save-palette-button"
              variant="contained"
              onClick={openPaletteSaveForm}
            >
              Save Palette
            </Button>
            <Link to="/">
              <Button variant="contained" color="secondary">
                Go Back
              </Button>
            </Link>
          </div>
        </div>
        {openForm && (
          <div className="validator-form">
            <PaletteMetaForm
              openForm={openForm}
              colors={colors}
              palettes={palettes}
              setPalettes={setPalettes}
              setOpenForm={setOpenForm}
              openPaletteSaveForm={openPaletteSaveForm}
            />
          </div>
        )}
      </AppBar>
    </div>
  );
};

export default PaletteNav;
