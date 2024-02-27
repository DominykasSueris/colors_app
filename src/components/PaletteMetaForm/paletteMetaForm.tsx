import { Dispatch, SetStateAction, useState } from "react";
import { useNavigate } from "react-router";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { SeedColor } from "../../models/SeedColor";
import { Color } from "../NewPalette/newPalette";

interface PaletteMetaForm {
  openForm: string;
  palettes: SeedColor[];
  colors: Color[];
  setOpenForm: Dispatch<SetStateAction<string>>;
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
}

const PaletteMetaForm = ({
  openForm,
  colors,
  palettes,
  setOpenForm,
  setPalettes
}: PaletteMetaForm) => {
  const navigate = useNavigate();
  const [paletteName, setPaletteName] = useState<string>("");

  ValidatorForm.addValidationRule("isPaletteNameUnique", value =>
    palettes.every(palette => palette.paletteName !== paletteName)
  );

  const handleClose = () => {
    setOpenForm("");
  };

  const saveNewPalette = (paletteName: string, emoji: string) => {
    const newPalette: SeedColor = {
      paletteName: paletteName,
      colors: colors.map(color => ({
        name: color.name,
        color: color.color.hex
      })),
      id: paletteName.toLocaleLowerCase().replace(/ /g, "-"),
      emoji: emoji
    };
    const newPalettes = [...palettes, newPalette];
    setPalettes(newPalettes);
    saveToLocalStorage(newPalettes);
    navigate("/");
  };

  const saveToLocalStorage = (palettes: SeedColor[]) => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  };

  const handleChangePaletteName = (e: React.FormEvent<HTMLInputElement>) => {
    setPaletteName(e.currentTarget.value);
  };

  const showEmojiPicker = () => {
    setOpenForm("emoji");
  };

  return (
    <>
      <Dialog open={openForm === "emoji"} onClose={handleClose}>
        <DialogTitle>Choose a Palette Emoji</DialogTitle>
        <Picker
          data={data}
          onEmojiSelect={({ native }: { native: string }) => saveNewPalette(paletteName, native)}
        />
      </Dialog>
      <Dialog open={openForm === "form"} onClose={handleClose}>
        <DialogTitle fontWeight="bold">Choose a Palette Name</DialogTitle>
        <ValidatorForm onSubmit={showEmojiPicker}>
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
              validators={["required", "isPaletteNameUnique"]}
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
