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
  openForm: boolean;
  palettes: SeedColor[];
  colors: Color[];
  setOpenForm: Dispatch<SetStateAction<boolean>>;
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
  openPaletteSaveForm: () => void;
}

const PaletteMetaForm = ({
  openForm,
  colors,
  palettes,
  setOpenForm,
  setPalettes,
  openPaletteSaveForm
}: PaletteMetaForm) => {
  const navigate = useNavigate();
  const [paletteName, setPaletteName] = useState<string>("");

  const handleClose = () => {
    setOpenForm(false);
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
      <Button variant="contained" onClick={openPaletteSaveForm}>
        Save
      </Button>
      <Dialog open={openForm} onClose={handleClose}>
        <DialogTitle fontWeight="bold">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={() => saveNewPalette(paletteName)}>
          <DialogContent>
            <DialogContentText>
              Please enter the name for your new color palette. Make sure it's unique!
            </DialogContentText>
            <TextValidator
              label="PalleteName"
              value={paletteName}
              name="newPalleteName"
              fullWidth
              variant="filled"
              margin="normal"
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
          </DialogContent>
        </ValidatorForm>
      </Dialog>
    </>
  );
};

export default PaletteMetaForm;
