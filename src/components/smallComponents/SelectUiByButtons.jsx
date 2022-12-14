import React from "react";
import {
  Button,
  ButtonGroup,
  Typography,
  Grid,
  Container,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  space: {
    marginBottom: 10,
  },
}));
const SelectUiByButtons = ({
  name,
  progressMade,
  tabularData,
  showGraphData,
  selected,
}) => {
  const classes = useStyles();
  return (
    <Container className={classes.container}>
      <Grid item xs={12} className={classes.space}>
        <Typography variant="h4"> {name}</Typography>
      </Grid>
      <Grid item xs={12} className={classes.space}>
        <ButtonGroup
          size="large"
          color="primary"
          aria-label="large outlined primary button group"
        >
          <Button
            variant={selected === "tabularData" ? "contained" : "outlined"}
            onClick={() => tabularData.action()}
          >
            {tabularData.label}
          </Button>
          <Button
            variant={selected === "progressMade" ? "contained" : "outlined"}
            onClick={() => progressMade.action()}
          >
            {progressMade.label}
          </Button>
          <Button
            variant={selected === "showGraphData" ? "contained" : "outlined"}
            onClick={() => showGraphData.action()}
          >
            {showGraphData.label}
          </Button>
        </ButtonGroup>
      </Grid>
    </Container>
  );
};

export default SelectUiByButtons;
