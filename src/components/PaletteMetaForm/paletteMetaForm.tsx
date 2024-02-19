import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { SeedColor } from "../../models/SeedColor";
import { Color } from "../NewPalette/newPalette";

interface PaletteMetaForm {
  palettes: SeedColor[];
  colors: Color[];
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
}

const PaletteMetaForm = ({ colors, palettes, setPalettes }: PaletteMetaForm) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState<boolean>(false);
  const [paletteName, setPaletteName] = useState<string>("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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

  const handleChangePaletteName = (e: React.FormEvent<HTMLInputElement>) => {
    setPaletteName(e.currentTarget.value);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open form dialog
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates
            occasionally.
          </DialogContentText>
          <ValidatorForm onSubmit={() => saveNewPalette(paletteName)}>
            <TextValidator
              label="PalleteName"
              value={paletteName}
              name="newPalleteName"
              onChange={handleChangePaletteName}
              // fix validation
              errorMessages={["Enter Palette Name", "Name already used"]}
            />
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button variant="contained" color="primary" type="submit">
                Save Palette
              </Button>
            </DialogActions>
          </ValidatorForm>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PaletteMetaForm;
