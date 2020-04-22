import React from "react";
import TextField from "@material-ui/core/TextField";
import { ACTIONS } from "./actions";

const MeanStdInput = ({ values, onChange }) => {
  const { mean, STD } = values;
  return (
    <>
      <TextField
        type="number"
        id={ACTIONS.SET_MEAN}
        label="Mean"
        variant="outlined"
        defaultValue={mean}
        onChange={(e) => onChange(e.target.id, e.target.value)}
      />
      <TextField
        type="number"
        id={ACTIONS.SET_STD}
        label="STD"
        variant="outlined"
        defaultValue={STD}
        onChange={(e) => onChange(e.target.id, e.target.value)}
      />
    </>
  );
};

export default MeanStdInput;
