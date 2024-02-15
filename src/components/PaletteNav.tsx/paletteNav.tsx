import { Link } from "react-router-dom";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { Button } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "../AppBar/appBar";

interface PaletteNavProps {
  open: boolean;
  handleDrawerOpen: () => void;
  saveNewPalette: (palleteName: string) => void;
  setPaletteName: (e: string) => void;
  paletteName: string;
}

const PaletteNav = ({
  open,
  handleDrawerOpen,
  saveNewPalette,
  setPaletteName,
  paletteName
}: PaletteNavProps) => {
  const handleChangePaletteName = (e: React.FormEvent<HTMLInputElement>) => {
    setPaletteName(e.currentTarget.value);
  };

  return (
    <div>
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
          <ValidatorForm onSubmit={() => saveNewPalette(paletteName)}>
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
          <Link to="/">
            <Button variant="contained" color="secondary">
              Go Back
            </Button>
          </Link>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default PaletteNav;
