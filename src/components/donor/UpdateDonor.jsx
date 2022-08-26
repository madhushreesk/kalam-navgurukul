import React from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Button } from "@mui/material";

const baseURL = import.meta.env.VITE_API_URL;
const animatedComponents = makeAnimated();

const UpdateDonor = ({ value, studentId, change, allOptions }) => {
  const { enqueueSnackbar } = useSnackbar();
  const [selectedDonors, setSelectedDonors] = React.useState(value);

  const updateDonor = () =>
    axios
      .put(`${baseURL}students/${studentId}`, {
        donor: selectedDonors.map((item) => item.id),
      })
      .then((res) => {
        change(selectedDonors ?? []);
        enqueueSnackbar(res.data.data, {
          variant: "success",
        });
      })
      .catch(() => {
        enqueueSnackbar(`Error in Updating Donor`, {
          variant: "error",
        });
      });

  const handleChange = (event) =>
    setSelectedDonors(
      value && event === null
        ? []
        : event.map((item) => ({ id: item.value, donor: item.label }))
    );

  return (
    <>
      <Select
        className="filterSelectStage"
        components={{ animatedComponents }}
        isMulti
        value={
          selectedDonors
            ? selectedDonors.map((x) => ({ value: x.id, label: x.donor }))
            : selectedDonors
        }
        onChange={handleChange}
        options={allOptions.map((x) => ({ value: x.id, label: x.name }))}
        isClearable={false}
      />
      <Button
        color="primary"
        disabled={JSON.stringify(selectedDonors) === JSON.stringify(value)}
        onClick={updateDonor}
      >
        Update
      </Button>
    </>
  );
};

export default UpdateDonor;
