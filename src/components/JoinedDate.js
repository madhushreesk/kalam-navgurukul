import React from "react";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import EditIcon from "@material-ui/icons/Edit";
import moment from "moment";
import Moment from "react-moment";
import { useSnackbar } from "notistack";
const baseURL = process.env.API_URL;
import axios from "axios";

const JoinedDate = (props) => {
  const snackbar = useSnackbar();
  const [state, setState] = React.useState({
    currentDate: props.value,
    isShowDatePicker: false,
  });

  const changeDate = (date) => {
    const { transitionId } = props;
    const formateddate = moment(date).format("YYYY-MM-DD");
    axios
      .put(`${baseURL}students/transition/${transitionId}`, {
        when: formateddate,
      })
      .then(() => {
        snackbar.enqueueSnackbar(`Joining successfully updated !`, {
          variant: "success",
        });
      })
      .catch((err) => {
        console.error(err);
        snackbar.enqueueSnackbar(`Something went wrong`, {
          variant: "unsuccess!",
        });
      });
    setState({
      currentDate: date,
      isShowDatePicker: !state.isShowDatePicker,
    });
  };

  const showDatePicker = () =>
    setState({ ...state, isShowDatePicker: !state.isShowDatePicker });

  const { currentDate, isShowDatePicker } = state;
  if (isShowDatePicker) {
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          margin="dense"
          style={{ marginLeft: 16 }}
          value={currentDate}
          id="date-picker-dialog"
          label="Joining Date"
          format="MM/dd/yyyy"
          onChange={changeDate}
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
        />
      </MuiPickersUtilsProvider>
    );
  }
  return (
    <div>
      <Moment format="D MMM YYYY" withTitle style={{ marginRight: 10 }}>
        {currentDate}
      </Moment>
      <EditIcon onClick={showDatePicker} style={{ cursor: "pointer" }} />
    </div>
  );
};

export default JoinedDate;
