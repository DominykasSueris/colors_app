import { Dispatch, MouseEventHandler, SetStateAction, useState } from "react";
import Dialog from "@mui/material/Dialog";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import Avatar from "@mui/material/Avatar";
import DialogTitle from "@mui/material/DialogTitle";
import blue from "@mui/material/colors/blue";
import red from "@mui/material/colors/red";
import { Color, SeedColor } from "../../models/SeedColor";
import DeleteIcon from "@mui/icons-material/Delete";
import "./miniPalette.scss";
interface MiniPaletteProps {
  paletteName: string;
  emoji: string;
  colors: Color[];
  handleClick: MouseEventHandler<HTMLDivElement>;
  palettes: SeedColor[];
  setPalettes: Dispatch<SetStateAction<SeedColor[]>>;
}

const MiniPalette = ({
  paletteName,
  palettes,
  emoji,
  colors,
  setPalettes,
  handleClick
}: MiniPaletteProps) => {
  const [openDeleteDialog, setOpenDeleteDialog] = useState<boolean>(false);
  const deletePalette = () => {
    const deletePalette = palettes.filter(palette => palette.paletteName !== paletteName);
    setPalettes(deletePalette);
    saveToLocalStorage(deletePalette);
  };

  const saveToLocalStorage = (palettes: SeedColor[]) => {
    window.localStorage.setItem("palettes", JSON.stringify(palettes));
  };

  const openDialog = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    setOpenDeleteDialog(true);
  };

  const closeDialog = () => {
    setOpenDeleteDialog(false);
  };

  return (
    <>
      <div className="main" onClick={handleClick}>
        <DeleteIcon
          className="main-delete-icon"
          style={{ transition: "all 0.3s ease-in-out" }}
          onClick={openDialog}
        />
        <div className="colors">
          {colors.map(color => (
            <div className="mini-color" style={{ background: color.color }} key={color.name}></div>
          ))}
        </div>
        <h5 className="title">
          {paletteName}
          <span className="emoji">{emoji}</span>
        </h5>
      </div>
      <Dialog open={openDeleteDialog} onClose={closeDialog} aria-labelledby="delete-dialog-title">
        <DialogTitle id="delete-dialog-title">Delete this Palette?</DialogTitle>
        <List>
          <ListItem button onClick={deletePalette}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: blue[100], color: blue[600] }}>
                <CheckIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Delete"></ListItemText>
          </ListItem>
          <ListItem button onClick={closeDialog}>
            <ListItemAvatar>
              <Avatar style={{ backgroundColor: red[100], color: red[600] }}>
                <CloseIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Cancel"></ListItemText>
          </ListItem>
        </List>
      </Dialog>
    </>
  );
};

export default MiniPalette;
