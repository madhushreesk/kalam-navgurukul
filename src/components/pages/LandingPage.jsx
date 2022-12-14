/* eslint-disable camelcase */
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Link, useNavigate, useParams } from "react-router-dom";
import dayjs from "dayjs";
import Grid from "@mui/material/Grid";
import { makeStyles, ThemeProvider } from "@mui/styles";
import ReactGA from "react-ga";
import { changeFetching } from "../../store/slices/uiSlice";
import VideoSlider from "../ui/VideoSlider";
import theme from "../../theme";
import { decryptText, encryptText } from "../../utils";
import {
  setEnrollmentKey,
  setPartner,
  setStudentData,
} from "../../store/slices/onlineTestSlice";
import { testClosed } from "../../utils/constants";

const baseUrl = import.meta.env.VITE_API_URL;

const useStyles = makeStyles(() => ({
  loginContainer: {
    padding: theme.spacing(3, 2),
    maxWidth: 400,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: "auto",
    boxShadow: "none",
  },
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    margin: theme.spacing(4),
  },
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
    flexGrow: 1,
  },
  paper: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(1),
    textAlign: "center",
    fontSize: 32,
    [theme.breakpoints.down("md")]: {
      fontSize: 24,
    },
  },
  typography: {
    fontFamily: "BlinkMacSystemFont",
  },
  fixedFooter: {
    [theme.breakpoints.up("sm")]: {
      position: "fixed",
      left: 0,
      right: 0,
      bottom: 0,
    },
  },
  modal: {
    position: "absolute",
    marginLeft: "3vw",
    marginRight: "3vw",
    width: "94vw",
    [theme.breakpoints.up("md")]: {
      margin: "auto",
      width: "50%",
    },
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: "none",
  },
}));

// const getModalStyle = () => {
//   const top = 50; // + rand()
//   const left = 50; //+ rand()

//   return {
//     top: `${top}%`,
//     left: `${left}%`,
//     transform: `translate(-${top}%, -${left}%)`,
//     overflowY: "scroll",
//     maxHeight: "80vh",
//     width: "60%",
//   };
// };

const LandingPage = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { slug } = useParams();
  const fetchingStart = () => dispatch(changeFetching(true));
  const fetchingFinish = () => dispatch(changeFetching(false));
  const { lang: selectedLang } = useSelector((state) => state.ui);
  const [state, setState] = React.useState({
    mobileNumber: "",
    firstName: "",
    middleName: "",
    lastName: "",
    mobile: "",
    selectedLang: "en",
    partnerId: "",
    modalOpen: false,
    data: [],
    pendingInterviewStage: "checking",
    enrollmentKey: "",
  });
  // const [goToTest, setGoToTest] = React.useState(false);
  const lang = {
    Heading: {
      en: "Software Engineering Scholarship",
      hi: "Software Engineering Scholarship",
      ma: "Software Engineering Scholarship",
    },
    Course: {
      en: "Course Information",
      hi: "??????????????? ?????? ???????????? ????????? ????????????",
      ma: "?????????????????????????????? ??????????????????",
    },
    Status: {
      en: "Check your test result by entering the number you gave test from",
      hi: "???????????? ????????? ???????????? ?????? ????????????????????? ?????? ??????, ????????? ???????????? ???????????? ???????????? ????????????????????? ?????????????????? ???????????????",
      ma: "?????????????????? ???????????? ???????????????????????????????????? ??????????????? ???????????? ???????????? ?????? ????????????????????? ??????????????? ??????????????? ??????????????? ??????????????? ???????????????",
    },
    AdmisssionTitle: {
      en: "Start Admisssion Test",
      hi: "????????????????????? ???????????? ????????????",
      ma: "?????????????????? ????????????????????? ???????????? ?????????",
    },
    TestButton: {
      en: "GIVE TEST",
      hi: "????????????????????? ?????????",
      ma: "????????????????????? ????????????.",
    },
    StatusButton: {
      en: "Check Result",
      hi: "?????????????????? ????????????",
      ma: "??????????????? ???????????????",
    },
    Footer: {
      en: "For more queries, write at hi@navgurukul.org",
      hi: "???????????? ????????????????????? ?????? ????????? ???????????? ?????????: hi@navgurukul.org",
      ma: "???????????? ????????????????????????????????????, ???????????? ????????????: hi@navgurukul.org",
    },
    mandatoryField: {
      en: "To attempt the test, it is compulsory to enter your First Name, Last Name and Mobile Number. Middle Name is optional, you can choose not to enter.",
      hi: "??????????????? ???????????? ?????? ????????? ???????????? ?????????????????? ?????????, ??????????????? ????????? ?????? ?????????????????? ???????????? ??????????????? ??????????????????  ????????? ???????????? ????????? ???????????????????????? ??????, ?????? ?????????????????? ???????????? ???????????? ????????? ???????????? ????????????",
      ma: "????????????????????? ????????????????????? ??????????????????????????????, ???????????? ?????????, ??????????????? ????????? ?????????????????? ???????????? ???????????????????????? ???????????? ???????????????????????? ?????????. ???????????? ????????? ?????????????????? ?????????, ?????????????????? ???????????? ??? ???????????? ??????????????? ????????????.",
    },
    mobileNumber: {
      en: "Please give 10 digits of the mobile number.",
      hi: "??????????????? ?????????????????? ???????????? ?????? 10 ????????? ????????????",
      ma: "??????????????? ?????????????????? ?????????????????? 10 ????????? ????????????.",
    },
  };

  const getTestData = () => ({
    enrollmentKey: localStorage.getItem("enrollmentKey"),
    time: localStorage.getItem("time"),
    studentId: localStorage.getItem("studentId"),
  });
  const partnerFetch = async (_slug) => {
    const response = await axios.get(`${baseUrl}partners/slug/${_slug}`, {});
    setState({
      ...state,
      partnerId: response.data.data.id,
    });
  };

  const generateTestLink = async (studentId) => {
    try {
      const partnerId = state.partnerId ? state.partnerId : null;
      const mobile = `0${state.mobileNumber}`;
      fetchingStart();
      const dataURL = `${baseUrl}helpline/register_exotel_call`;
      const response = await axios.get(dataURL, {
        params: {
          ngCallType: "getEnrolmentKey",
          From: mobile,
          partner_id: partnerId,
          student_id: studentId,
        },
      });
      return response;
    } catch (e) {
      enqueueSnackbar("Something went wrong", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      fetchingFinish();
    }
  };

  const { enrollmentKey, time } = getTestData();

  useEffect(() => {
    if (slug) {
      partnerFetch(slug);
    }
    if (time && enrollmentKey) {
      const Time = parseInt(decryptText(time), 10);
      const date = new Date(JSON.parse(Time));
      if (parseInt(dayjs(date).diff(dayjs(), "seconds"), 10) > 0) {
        // setGoToTest(true);
      } else {
        localStorage.removeItem("answerList");
        localStorage.removeItem("enrollmentKey");
        localStorage.removeItem("index");
        localStorage.removeItem("time");
        localStorage.removeItem("testStarted");
      }
    }
  }, []);

  useEffect(() => {
    // non interaction event
    ReactGA.pageview(window.location.pathname);
  }, []);

  const onChangeEvent = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeEventStatus = (e) => {
    setState({
      ...state,
      mobile: e.target.value,
    });
  };

  const isDuplicate = () => {
    const { mobileNumber, firstName, middleName, lastName } = state;
    const first_name = firstName.replace(
      firstName[0],
      firstName[0].toUpperCase()
    );
    const middle_name =
      middleName &&
      middleName.replace(middleName[0], middleName[0].toUpperCase());
    const last_name = lastName.replace(lastName[0], lastName[0].toUpperCase());
    axios
      .get(`${baseUrl}check_duplicate`, {
        params: {
          Name: firstName.concat(" ", middleName, lastName),
          Number: mobileNumber,
        },
      })
      .then(async (data) => {
        const response = data.data.data;
        if (response.alreadyGivenTest) {
          navigate(
            `/check_duplicate/name=${first_name}_${middle_name}_${last_name}&number=${mobileNumber}&stage=${response.pendingInterviewStage}`,
            {
              state: {
                ...state,
                data: response.data,
              },
            }
          );
        } else {
          const res = await generateTestLink();

          setState({
            ...state,
            mobileNumber: "",
            firstName: "",
            middleName: "",
            lastName: "",
            enrollmentKey: res.data.key,
          });
          fetchingFinish();

          dispatch(
            setStudentData({ firstName, middleName, lastName, mobileNumber })
          );
          dispatch(setPartner({ slug, id: state.partnerId }));
          localStorage.setItem("partnerSlug", encryptText(slug));
          dispatch(setEnrollmentKey(res.data.key));

          navigate(`/test/instructions`, {
            state: {
              firstName,
              middleName,
              lastName,
              mobileNumber,
              enrollmentKey: res.data.key,
              partner: { slug, partnerId: state.partnerId },
            },
          });
        }
      });
  };

  const giveTest = async () => {
    const { mobileNumber, firstName, lastName } = state;
    if (!mobileNumber || !firstName || !lastName) {
      enqueueSnackbar(<strong>{lang.mandatoryField[selectedLang]}</strong>, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }
    if (mobileNumber.toString().length !== 10) {
      enqueueSnackbar(<strong>{lang.mobileNumber[selectedLang]}</strong>, {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
      });
      return;
    }
    await isDuplicate();
  };

  if (slug && testClosed.partners.includes(slug))
    return (
      <Container sx={{ display: "flex", justifyContent: "center" }}>
        <Typography color="error" variant="h4">
          {testClosed.message}
        </Typography>
        ``
      </Container>
    );

  const { mobileNumber, firstName, middleName, lastName, mobile } = state;
  return (
    <div
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        // minHeight: "calc(100vh - 8rem)",
        display: "flex",
      }}
    >
      <ThemeProvider theme={theme}>
        {/* {goToTest ? (
          <Button
            variant="text"
            color="primary"
            onClick={() => navigate(-1)}
            size="large"
          >
            Go Back to Test
          </Button>
        ) : null} */}
        <Typography className={classes.paper}>
          {lang.Heading[selectedLang]}
        </Typography>
        <Grid container>
          <Grid
            item
            xs={12}
            sm={6}
            style={{
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
            }}
          >
            <VideoSlider language={selectedLang} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Grid item xs={12}>
              <Box style={{ height: theme.spacing(2) }} />
            </Grid>
            <Grid item>
              <Paper className={classes.loginContainer}>
                <Box>
                  <Grid item xs={12}>
                    <Typography variant="h5" component="h4">
                      {lang.AdmisssionTitle[selectedLang]}
                    </Typography>
                  </Grid>
                </Box>
                <Box style={{ height: theme.spacing(2) }} />
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <TextField
                    required
                    id="filled-full-width"
                    margin="normal"
                    style={{ margin: 8 }}
                    label="First Name"
                    name="firstName"
                    value={firstName}
                    placeholder="First Name..."
                    onChange={onChangeEvent}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />

                  <TextField
                    id="filled-full-width"
                    margin="normal"
                    style={{ margin: 8 }}
                    name="middleName"
                    label="Middle Name"
                    value={middleName}
                    placeholder="Middle Name..."
                    onChange={onChangeEvent}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </div>
                <div
                  style={{
                    display: "flex",
                  }}
                >
                  <TextField
                    required
                    id="filled-full-width"
                    margin="normal"
                    name="lastName"
                    style={{ margin: 8 }}
                    label="Last Name"
                    value={lastName}
                    placeholder="Last Name..."
                    onChange={onChangeEvent}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />

                  <TextField
                    required
                    id="filled-full-width"
                    margin="normal"
                    style={{
                      margin: 8,
                    }}
                    type="number"
                    name="mobileNumber"
                    label="Mobile Number"
                    value={mobileNumber}
                    placeholder="Mobile Number..."
                    onChange={onChangeEvent}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </div>
                <div className={classes.root}>
                  <Button variant="outlined" onClick={giveTest} color="primary">
                    {lang.TestButton[selectedLang]}
                  </Button>
                </div>
              </Paper>
            </Grid>
            <Box style={{ height: theme.spacing(6) }} />
            <Grid item>
              <Box
                display="flex"
                alignItems="center"
                flexDirection="column"
                px={4}
                style={{ textAlign: "center" }}
              >
                <Typography
                  className={classes.typography}
                  variant="h5"
                  component="h3"
                >
                  {lang.Status[selectedLang]}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Paper className={classes.loginContainer}>
                <Box>
                  <TextField
                    id="filled-full-width"
                    margin="normal"
                    style={{ margin: 8 }}
                    label="Mobile Number"
                    value={state.mobile}
                    placeholder="Mobile Number..."
                    onChange={onChangeEventStatus}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    variant="outlined"
                  />
                </Box>
                <div className={classes.root}>
                  <Link
                    to={{
                      pathname: `/status/${mobile}`,
                      state: { mobile },
                    }}
                  >
                    <Button variant="outlined" color="primary">
                      {lang.StatusButton[selectedLang]}
                    </Button>
                  </Link>
                </div>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
      {/* <Box style={{ height: theme.spacing(6) }} /> */}
    </div>
  );
};

export default LandingPage;
