import React, { useEffect } from "react";
import {
  Autocomplete,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import RSelect from "react-select";

import { DatePicker, LocalizationProvider } from "@mui/lab";
import DateFnsUtils from "@mui/lab/AdapterDateFns";
import { Controller, useForm } from "react-hook-form";
import dayjs from "dayjs";
import { useSnackbar } from "notistack";
import axios from "axios";
import { states } from "../../utils/constants";

const baseUrl = import.meta.env.VITE_API_URL;

const AddNewStudent = () => {
  const { enqueueSnackbar } = useSnackbar();
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    reset,
  } = useForm();

  const [districts, setDistricts] = React.useState([]);
  const [optionsData, setOptionsData] = React.useState({
    campus: [],
    donor: [],
    partner: [],
  });

  const [studentData, setStudentData] = React.useState({
    fullName: "",
    email: "",
    number: "",
    alternateNumber: "",
    gender: "",
    dob: "",
    district: "",
    pinCode: "",
    state: "",
    city: "",
    currentStatus: "",
    qualification: "",
    schoolMedium: "",
    caste: "",
    religion: "",
    percentageIn10th: "",
    percentageIn12th: "",
  });

  const getDistrictFromState = async (state) => {
    const districtRes = await axios.get(
      `https://api.countrystatecity.in/v1/countries/IN/states/${state}/cities`,
      {
        headers: {
          accept: "application/json",
          "X-CSCAPI-KEY":
            "TzZrb2p0emtqa29BOW0zTnpLZHdzOVdjNmlubnRDMmtqOEgxRXpFdw==",
        },
      }
    );
    setDistricts(districtRes.data);
  };

  const fetchLists = async () => {
    const campusRes = await axios.get(`${baseUrl}campus`);
    const campusList = campusRes.data.data.map(({ id, campus: name }) => ({
      name,
      id,
    }));

    const donorRes = await axios.get(`${baseUrl}donors`);
    const donorList = donorRes.data.map(({ id, donor: donorName }) => ({
      label: donorName,
      value: id,
    }));
    const partnerRes = await axios.get(`${baseUrl}partners`);
    const partnerList = partnerRes.data.data.map((partnerItem) => ({
      label: partnerItem.name,
      value: partnerItem.id,
    }));
    setOptionsData({
      ...optionsData,
      campus: campusList,
      donor: donorList,
      partner: [...partnerList],
    });
  };

  console.log(optionsData);

  const addrState = watch("state");
  const qualification = watch("qualification");

  useEffect(() => {
    (async () => {
      await fetchLists();
    })();
  }, []);

  useEffect(() => {
    if (addrState !== "") {
      getDistrictFromState(addrState);
    }
  }, [addrState]);

  return (
    <Container maxWidth="md" sx={{ mb: "2.4rem" }}>
      <Typography fontWeight="medium" variant="h4">
        Add New Student Data
      </Typography>
      <Divider color="gray" sx={{ mt: "0.8rem", mb: "2rem" }} />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Typography variant="h6">Basic Details</Typography>
          <Divider color="gray" sx={{ mt: "0.2rem", width: "120%" }} />
        </Grid>

        <Grid item xs={9} />
        <Grid item xs={12}>
          <Controller
            control={control}
            name="name"
            rules={{
              required: true,
            }}
            defaultValue={studentData.fullName}
            render={({ field: { ref, ...rest } }) => (
              <TextField
                fullWidth
                required
                variant="outlined"
                id="name"
                inputRef={ref}
                label="Full Name"
                placeholder="Full Name"
                autoComplete="off"
                error={!!errors.name}
                type="text"
                helperText={errors.name ? "Enter Full Name" : "Ex. ABC"}
                {...rest}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="number"
            rules={{
              required: true,
            }}
            defaultValue={studentData.number}
            render={({ field: { ref, ...rest } }) => (
              <TextField
                fullWidth
                required
                variant="outlined"
                id="number"
                inputRef={ref}
                label="Mobile No."
                placeholder="Mobile No."
                autoComplete="off"
                error={!!errors.number}
                type="text"
                helperText={
                  errors.number ? "Enter Mobile No." : "Ex. 88844xxxxx"
                }
                {...rest}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            defaultValue={studentData.email}
            name="email"
            rules={{
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            }}
            render={({ field: { ref, ...rest } }) => (
              <TextField
                variant="outlined"
                inputRef={ref}
                type="email"
                required
                label="Email"
                placeholder="Email"
                error={!!errors.email}
                helperText={
                  errors.email
                    ? errors.email.type === "pattern"
                      ? "Enter Valid Email"
                      : "Enter Email"
                    : "Ex. xyz@mail.com"
                }
                autoComplete="off"
                fullWidth
                {...rest}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            name="gender"
            defaultValue={studentData.gender || "select gender"}
            render={({ field: { ref, ...rest } }) => (
              <FormControl variant="outlined" fullWidth>
                <InputLabel id="gender-label">Select Gender</InputLabel>
                <Select
                  label="Select Gender"
                  placeholder="Select Gender"
                  error={!!errors.gender}
                  id="gender"
                  inputRef={ref}
                  required
                  {...rest}
                >
                  {[
                    {
                      key: "select gender",
                      en: "Select Gender",
                    },
                    { key: "female", en: "Female" },
                    { key: "male", en: "Male" },
                    { key: "other", en: "Other" },
                    {
                      key: "trans",
                      en: "Transwomen",
                    },
                  ].map((el) => (
                    <MenuItem
                      key={el.key}
                      value={el.key}
                      disabled={el.en === "Select Gender"}
                    >
                      {el.en}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.gender ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Please specify student&apos;s gender
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="dob"
            defaultValue={studentData.dob || null}
            rules={{
              // required: true,
              validate: (dob) =>
                parseInt(dayjs().diff(dayjs(dob), "year"), 10) >= 17,
            }}
            render={({
              field: { ref, ...rest },
              fieldState: { isTouched },
            }) => (
              <LocalizationProvider dateAdapter={DateFnsUtils}>
                <DatePicker
                  disableFuture
                  // margin="normal"
                  id="dob"
                  label="Date of Birth"
                  inputRef={ref}
                  focused={isTouched}
                  inputFormat="dd/MM/yyyy"
                  inputVariant="outlined"
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      error={!!errors.dob}
                      helperText={
                        errors.dob
                          ? errors.dob.type === "validate"
                            ? "Age must be between 17 & 28"
                            : "Enter Date of Birth"
                          : "Ex. 19/11/2003"
                      }
                    />
                  )}
                  fullWidth
                  placeholder="Date of Birth"
                  error={!!errors.dob}
                  {...rest}
                />
              </LocalizationProvider>
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="caste"
            defaultValue={studentData.caste || "Select Option"}
            rules={{
              validate: (caste) => caste !== "Select Option",
            }}
            render={({ field: { ref, ...rest } }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="demo-simple-select-outlined-label">
                  Caste/Tribe
                </InputLabel>
                <Select
                  label="Caste/Tribe"
                  placeholder="Caste/Tribe"
                  error={!!errors.caste}
                  required
                  inputRef={ref}
                  {...rest}
                >
                  <MenuItem value="Select Option" disabled>
                    Select Option
                  </MenuItem>
                  <MenuItem value="scSt">
                    (SC) Scheduled Caste / (ST) Scheduled Tribe
                  </MenuItem>
                  <MenuItem value="obc">(OBC) Other Backward Classes</MenuItem>
                  <MenuItem value="general">General</MenuItem>
                  <MenuItem value="others">Other</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.caste ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select student&apos; Caste/Tribe
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12}>
          <Controller
            control={control}
            name="religion"
            defaultValue={studentData.religion || ""}
            // rules={{ required: true }}
            render={({ field: { ref, ...rest } }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="religion-label">Religion</InputLabel>
                <Select
                  label="Religion"
                  placeholder="Religion"
                  required
                  inputRef={ref}
                  error={!!errors.religion}
                  {...rest}
                >
                  <MenuItem value="" disabled>
                    Select Option
                  </MenuItem>
                  <MenuItem value="hindu">Hindu</MenuItem>
                  <MenuItem value="islam">Islam</MenuItem>
                  <MenuItem value="sikh">Sikh</MenuItem>
                  <MenuItem value="christian">Christian</MenuItem>
                  <MenuItem value="jain">Jain</MenuItem>
                  <MenuItem value="buddhism">Buddhism</MenuItem>
                  <MenuItem value="others">Others</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.religion ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select student&apos;s Religion
            </Typography>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "1.2rem" }}>
        <Grid item xs={3}>
          <Typography variant="h6">Address Details</Typography>
          <Divider color="gray" sx={{ mt: "0.2rem", width: "120%" }} />
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue={studentData.state || ""}
            name="state"
            rules={{ required: true, validate: (st) => st !== "" }}
            render={({ field: { ref, ...rest } }) => (
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="state-label">Select State</InputLabel>
                <Select
                  error={!!errors.state}
                  required
                  inputRef={ref}
                  label="Select State"
                  placeholder="Select State"
                  // MenuProps={{ classes: { paper: classes.menuPaper } }}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...rest}
                >
                  <MenuItem value="" disabled>
                    Select State
                  </MenuItem>
                  {Object.entries(states).map(([key, value]) => (
                    <MenuItem key={key} value={key}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.state ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select student&apos;s State
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue={studentData.district || ""}
            name="district"
            rules={{
              required: true,
              validate: (district) => district !== "",
            }}
            render={({ field: { ref, ...rest } }) => (
              <FormControl fullWidth variant="outlined" required>
                <InputLabel id="district-label">Select District</InputLabel>
                <Select
                  error={!!errors.district}
                  required
                  inputRef={ref}
                  // eslint-disable-next-line react/jsx-props-no-spreading
                  {...rest}
                  label="Select District"
                  placeholder="Select District"
                  // MenuProps={{ classes: { paper: classes.menuPaper } }}
                >
                  <MenuItem value="" disabled>
                    Select District
                  </MenuItem>
                  {districts.map(({ name }) => (
                    <MenuItem key={name} value={name}>
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.district ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select student&apos;s District
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            defaultValue={studentData.city}
            name="city"
            // rules={{ required: "true" }}
            render={({ field: { ref, ...rest } }) => (
              <TextField
                variant="outlined"
                inputRef={ref}
                {...rest}
                fullWidth
                id="city"
                label="City"
                placeholder="City"
                autoComplete="off"
                error={!!errors.city}
                helperText={
                  errors.city ? "Select student's City" : "Ex. Bangalore"
                }
              />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            rules={{ minLength: 6, maxLength: 6 }}
            defaultValue={studentData.pinCode}
            name="pinCode"
            render={({ field: { ref, ...rest } }) => (
              <TextField
                variant="outlined"
                fullWidth
                id="pinCode"
                inputRef={ref}
                label="Pin Code"
                placeholder="Pin Code"
                autoComplete="off"
                error={!!errors.pinCode}
                helperText={
                  errors.pinCode
                    ? errors.pinCode.type === "minLength" ||
                      errors.pinCode.type === "maxLength"
                      ? "Enter a valid Pin Code"
                      : "Enter student's Pin Code"
                    : "Ex. 4402xx"
                }
                {...rest}
              />
            )}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "1.2rem" }}>
        <Grid item xs={3}>
          <Typography variant="h6">Qualification Details</Typography>
          <Divider color="gray" sx={{ mt: "0.2rem", width: "120%" }} />
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            rules={{
              // required: "true",
              validate: (ct) => ct !== "Select Option",
            }}
            defaultValue={studentData.currentStatus || "Select Option"}
            name="currentStatus"
            render={({ field: { ref, ...rest } }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="current-status-label">
                  Current Status
                </InputLabel>
                <Select
                  error={!!errors.currentStatus}
                  label="Current Status"
                  placeholder="Current Status"
                  inputRef={ref}
                  {...rest}
                >
                  <MenuItem value="Select Option" disabled>
                    Select Option
                  </MenuItem>
                  {["Nothing", "Job", "Study", "Other"].map((el) => (
                    <MenuItem key={el} value={el.toLowerCase()}>
                      {el}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.currentStatus ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select student&apos;s Current Status
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            rules={{ required: "true", validate: (q) => q !== "" }}
            defaultValue={studentData.qualification || ""}
            name="qualification"
            render={({ field: { ref, ...rest } }) => (
              <FormControl variant="outlined" fullWidth required>
                <InputLabel id="qualification-label">
                  Maximum Qualification
                </InputLabel>
                <Select
                  label="Maximum Qualification"
                  placeholder="Maximum Qualification"
                  error={!!errors.qualification}
                  required
                  inputRef={ref}
                  {...rest}
                >
                  <MenuItem value="" disabled>
                    Select Option
                  </MenuItem>
                  <MenuItem value="lessThan10th">Less than 10th pass</MenuItem>
                  <MenuItem value="class10th">10th pass</MenuItem>
                  <MenuItem value="class12th">12th pass</MenuItem>
                  <MenuItem value="graduate">Graduated</MenuItem>
                  <MenuItem value="iti">ITI</MenuItem>
                </Select>
              </FormControl>
            )}
          />
          {errors.qualification ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select student&apos; Current Qualification
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        {qualification === "class10th" ? (
          <Grid item xs={12} sm={12}>
            <Controller
              control={control}
              defaultValue={studentData.percentageIn10th}
              rules={{ max: 100, min: 33 }}
              name="percentageIn10th"
              render={({ field: { ref, ...rest } }) => (
                <TextField
                  variant="outlined"
                  inputRef={ref}
                  {...rest}
                  fullWidth
                  label="Percentage in 10th class"
                  placeholder="Percentage in 10th class"
                  type="number"
                  autoComplete="off"
                  error={!!errors.percentageIn10th}
                  helperText={
                    errors.percentageIn10th
                      ? errors.percentageIn10th.type === "max" ||
                        errors.percentageIn10th.type === "min"
                        ? "Enter valid Percentage"
                        : "Enter 10th Class Percentage"
                      : "Ex. 86.40"
                  }
                />
              )}
            />
          </Grid>
        ) : null}
        {qualification === "class12th" ||
        qualification === "graduate" ||
        qualification === "iti" ? (
          <>
            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                defaultValue={studentData.percentageIn10th}
                rules={{
                  // required: !customPartner.includes(partnerSlug),
                  min: 33,
                  max: 100,
                }}
                name="percentageIn10th"
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    variant="outlined"
                    inputRef={ref}
                    {...rest}
                    fullWidth
                    label="Percentage in 10th class"
                    placeholder="Percentage in 10th class"
                    type="number"
                    autoComplete="off"
                    error={!!errors.percentageIn10th}
                    helperText={
                      errors.percentageIn10th
                        ? errors.percentageIn10th.type === "max" ||
                          errors.percentageIn10th.type === "min"
                          ? "Enter valid Percentage"
                          : "Enter 10th Class Percentage"
                        : "Ex. 86.40"
                    }
                  />
                )}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Controller
                control={control}
                name="percentageIn12th"
                rules={{
                  // required: !customPartner.includes(partnerSlug),
                  min: 33,
                  max: 100,
                }}
                defaultValue={studentData.percentageIn12th}
                render={({ field: { ref, ...rest } }) => (
                  <TextField
                    variant="outlined"
                    inputRef={ref}
                    {...rest}
                    fullWidth
                    label={
                      {
                        class12th: "Percentage in 12th class",
                        graduate: "Percentage in 12th class",
                        iti: "Percentage in ITI",
                      }[qualification]
                    }
                    placeholder={
                      {
                        class12th: "Percentage in 12th class",
                        graduate: "Percentage in 12th class",
                        iti: "Percentage in ITI",
                      }[qualification]
                    }
                    type="number"
                    autoComplete="off"
                    error={!!errors.percentageIn12th}
                    helperText={
                      errors.percentageIn12th
                        ? errors.percentageIn12th.type === "min" ||
                          errors.percentageIn12th.type === "max"
                          ? "Enter valid Percentage"
                          : {
                              class12th: "Enter 12th Class Percentage",
                              graduate: "Enter 12th Class Percentage",
                              iti: "Enter ITI Percentage",
                            }[qualification]
                        : "Ex. 76.40"
                    }
                  />
                )}
              />
            </Grid>
          </>
        ) : null}
        <Grid item xs={12}>
          <Controller
            control={control}
            name="schoolMedium"
            defaultValue={studentData.schoolMedium || ""}
            rules={{ validate: (sm) => sm !== "" }}
            render={({ field: { ref, ...rest } }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="school-medium-label">School Medium</InputLabel>
                <Select
                  label="School Medium"
                  placeholder="School Medium"
                  error={!!errors.schoolMedium}
                  inputRef={ref}
                  {...rest}
                >
                  <MenuItem value="" disabled>
                    School Medium
                  </MenuItem>

                  {Object.entries({
                    hi: ["Hindi", "हिन्दी"],
                    en: ["English", "अंग्रेज़ी"],
                    ma: ["Marathi", "मराठी"],
                    ur: ["Urdu", "उर्दू"],
                  }).map(([key, value]) => (
                    <MenuItem value={key} key={key}>
                      {value[0]}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          />
          {errors.schoolMedium ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select student&apos; School Medium
            </Typography>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
      <Grid container spacing={2} sx={{ mt: "1.2rem" }}>
        <Grid item xs={3}>
          <Typography variant="h6">NavGurukul Details</Typography>
          <Divider color="gray" sx={{ mt: "0.2rem", width: "120%" }} />
        </Grid>
        <Grid item xs={9} />
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="campus"
            defaultValue={studentData.campus || ""}
            rules={{ validate: (sm) => sm !== "" }}
            render={({ field: { ref, ...rest } }) => (
              <FormControl fullWidth variant="outlined">
                <InputLabel id="school-medium-label">Select Campus</InputLabel>
                <Select
                  label="Select Campus"
                  placeholder="Select Campus"
                  error={!!errors.campus}
                  inputRef={ref}
                  {...rest}
                >
                  <MenuItem value="" disabled>
                    Select Campus
                  </MenuItem>

                  {optionsData.campus.map((campusItem) => (
                    <MenuItem value={campusItem.id} key={campusItem.id}>
                      {campusItem.name}
                    </MenuItem>
                  ))}

                  {/* {Object.entries({
                    hi: ["Hindi", "हिन्दी"],
                    en: ["English", "अंग्रेज़ी"],
                    ma: ["Marathi", "मराठी"],
                    ur: ["Urdu", "उर्दू"],
                  }).map(([key, value]) => (
                    <MenuItem value={key} key={key}>
                      {value[0]}
                    </MenuItem>
                  ))} */}
                </Select>
              </FormControl>
            )}
          />
          {errors.campus ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select Campus
            </Typography>
          ) : (
            ""
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            control={control}
            name="partner"
            rules={{ validate: (sm) => sm !== "" }}
            render={({ field: { ref, ...rest } }) => (
              <FormControl fullWidth variant="outlined">
                <RSelect
                  label="School Medium"
                  placeholder="School Medium"
                  error={!!errors.schoolMedium}
                  inputRef={ref}
                  {...rest}
                  options={optionsData.partner}
                  menuPortalTarget={document.body}
                  styles={{ menuPortal: (base) => ({ ...base, zIndex: 9999 }) }}
                />
              </FormControl>
            )}
          />
          {errors.partner ? (
            <Typography
              style={{
                paddingLeft: "0.8rem",
                paddingTop: "0.4rem",
                paddingBottom: "0.4rem",
              }}
              variant="caption"
              color="error"
            >
              Select Partner
            </Typography>
          ) : (
            ""
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default AddNewStudent;
