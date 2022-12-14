/* eslint-disable no-nested-ternary */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { setupUsers } from "../store/slices/authSlice";
import { changeFetching } from "../../store/slices/uiSlice";
import StudentService, {
  navGurukulSurveyForm,
} from "../../services/StudentService";
import DashboardPage from "../dashboard/Dashboard";
import SelectUiByButtons from "../smallComponents/SelectUiByButtons";
import StudentsProgressCards from "../student/StudentsProgressCards";
import PieRechartReport from "../partner/PieRechartReport";

import EvaluationSelect from "../smallComponents/EvaluationSelect";
import RedFlag from "./FlagModal";
// import user from "../utils/user";

//baseUrl
// const baseUrl = import.meta.env.VITE_API_URL;

const CampusStudentsData = () => {
  const dispatch = useDispatch();
  const { privileges } = useSelector((state) => state.auth);
  const fetchingFinish = () => dispatch(changeFetching(false));
  const [dataView, setDataView] = React.useState(0);

  const EvaluationColumn = {
    name: "evaluation",
    label: "Evaluation",
    options: {
      filter: false,
      sort: true,
      display: privileges.some(
        (priv) => priv.privilege === "UpdateStudentEvaluation"
      ),
      viewColumns: privileges.some(
        (priv) => priv.privilege === "UpdateStudentEvaluation"
      ),
      customBodyRender: React.useCallback(
        (value, rowMeta, updateValue) => (
          <EvaluationSelect
            rowMetatable={rowMeta}
            evaluation={value}
            change={(event) => updateValue(event)}
          />
        ),
        []
      ),
    },
  };

  const redFlagColumn = {
    label: "Flag",
    name: "redflag",
    options: {
      filter: true,
      filterType: "dropdown",
      display: privileges.some((priv) => priv.privilege === "ViewFlag"),
      viewColumns: privileges.some((priv) => priv.privilege === "ViewFlag"),
      customBodyRender: React.useCallback(
        (value, rowMeta, updateValue) => (
          <RedFlag
            rowMetaTable={rowMeta}
            studentId={rowMeta.rowData[0]}
            comment={value}
            change={(event) => updateValue(event)}
          />
        ),
        []
      ),
    },
  };

  useEffect(() => fetchingFinish(), []);

  const progressMade = () => {
    setDataView(1);
  };
  const tabularData = () => {
    setDataView(0);
  };
  const showGraphData = () => {
    setDataView(2);
  };

  const getVIew = (viewNo) => {
    switch (viewNo) {
      case 0:
        return (
          <DashboardPage
            isCampus
            displayData={[
              ...StudentService.CampusData,
              EvaluationColumn,
              redFlagColumn,
              navGurukulSurveyForm,
            ]}
            url="/allcampus/students"
          />
        );
      case 1:
        return <StudentsProgressCards url="allcampus" />;
      case 2:
        return <PieRechartReport url="/allcampus/students/distribution" />;
      default:
        return (
          <DashboardPage
            isCampus
            displayData={[
              ...StudentService.CampusData,
              EvaluationColumn,
              redFlagColumn,
              navGurukulSurveyForm,
            ]}
            url="/allcampus/students"
          />
        );
    }
  };
  return (
    //if user is allowed to access the page
    <>
      <SelectUiByButtons
        name="All Campus"
        progressMade={{ label: "Progress Made", action: progressMade }}
        tabularData={{ label: "Tabular Data", action: tabularData }}
        showGraphData={{ label: "Graph on Job", action: showGraphData }}
        selected={
          dataView === 0
            ? "tabularData"
            : dataView === 1
            ? "progressMade"
            : "showGraphData"
        }
      />
      {getVIew(dataView)}
    </>
  );
};

export default CampusStudentsData;
