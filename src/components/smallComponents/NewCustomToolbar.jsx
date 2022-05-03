import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const NewCustomToolbar = ({ handleOpen }) => (
  //BaseURL
  <Tooltip title="custom icon">
    <IconButton onClick={handleOpen}>
      <AddIcon />
    </IconButton>
  </Tooltip>
);
export default NewCustomToolbar;