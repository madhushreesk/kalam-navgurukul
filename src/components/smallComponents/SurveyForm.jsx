import React from "react";

import hash from "object-hash";
import {
  Button,
  Checkbox,
  Container,
  Divider,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { showDialog, updateDialogState } from "../../store/slices/uiSlice";

const formColor = [
  {
    name: "Form A",
    color: "#FFC478",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSfwJ-wBjATx2AjpwqBSlWM0rv0FFKP7or1Jx3PqoijbU_tj_A/viewform?usp=pp_url&entry.1892909192=",
  },
  {
    name: "Form B",
    color: "#75CFB8",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSd3f9XiYVkzGV7ZggLAlTSg-rDM4HqsdtafCzNJSXyVKFp24A/viewform?usp=pp_url&entry.824382679=",
  },
  {
    name: "Form C",
    color: "#EFB7B7",
    link: "https://docs.google.com/forms/d/e/1FAIpQLSetOkINBkhw4DKDAW81HajHvSr4vAGKa6epcFKN-4CmvUhsyA/viewform?usp=pp_url&entry.1823157052=",
  },
];

const SendMailDialogContent = () => {
  const { dialogState } = useSelector((state) => state.ui);
  const dispatch = useDispatch();

  return (
    <Container>
      <FormGroup>
        {Object.entries(dialogState).map(([key, val], inx) => (
          <FormControlLabel
            key={key}
            control={
              <Checkbox
                onChange={(e) =>
                  dispatch(
                    updateDialogState({
                      ...dialogState,
                      [key]: e.target.checked,
                    })
                  )
                }
                checked={val}
              />
            }
            label={key}
          />
        ))}
      </FormGroup>
    </Container>
  );
};

const SendMailDialogActions = () => {
  const { dialogState } = useSelector((state) => state.ui);
  const sendMail = () => {
    console.log(dialogState);
  };
  return (
    <Button variant="contained" color="primary" onClick={sendMail}>
      {" "}
      Send Email
    </Button>
  );
};

const SurveyForm = (props) => {
  const [url, setUrl] = React.useState("");
  const dispatch = useDispatch();

  const check = (a) => {
    const { data } = props;
    const hashValue = hash(data);
    setUrl(`${a}${hashValue}`);
  };

  const sendMail = () => {
    dispatch(
      showDialog({
        title: "Select Forms to Mail",
        content: <SendMailDialogContent />,
        actions: <SendMailDialogActions />,
        data: formColor.reduce((acc, el) => ({ ...acc, [el.name]: false }), {}),
      })
    );
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      {formColor.map((element) => (
        <a
          href={url}
          target="_blank"
          rel="noreferrer noopener"
          style={{
            backgroundColor: element.color,
            textAlign: "center",
            borderRadius: "75px",
            margin: "0.6rem",
          }}
          onClick={() => check(element.link)}
          key={element.name}
        >
          {element.name}
        </a>
      ))}
      <Divider color="black" />
      <Button
        variant="contained"
        color="primary"
        size="small"
        onClick={sendMail}
        sx={{ m: "0.6rem" }}
      >
        Send Email
      </Button>
    </div>
  );
};

export default SurveyForm;
