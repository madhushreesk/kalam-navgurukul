import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import NotHaveAccess from "../components/layout/NotHaveAccess";
import { parseJwt } from "../utils";
import { logout } from "../store/slices/authSlice";
import Loader from "../components/ui/Loader";

const RequireAuth = ({ children, privateRoute }) => {
  const { enqueueSnackbar } = useSnackbar();
  const decodedJwt = parseJwt(localStorage.getItem("jwt"));
  const location = useLocation();
  const params = useParams();
  const dispatch = useDispatch();
  const { isFetching } = useSelector((state) => state.ui);
  const { loggedInUser, isAuthenticated, roles, privileges } = useSelector(
    (state) => state.auth
  );
  if (decodedJwt && decodedJwt.exp * 1000 < Date.now()) {
    enqueueSnackbar("Token Expierd: Login Again", { variant: "info" });
    dispatch(logout());
    return <Navigate to="/" replace />;
  }
  if (!isAuthenticated && privateRoute) {
    sessionStorage.setItem("pageBeforeLogin", location.pathname);
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const getRoute = () => {
    //Forced redirect if any page was visited before login
    const pageBeforeLogin = sessionStorage.getItem("pageBeforeLogin");
    if (pageBeforeLogin) {
      sessionStorage.removeItem("pageBeforeLogin");
      return pageBeforeLogin;
    }

    if (
      roles.some((role) => role.role === "Admin") ||
      privileges.some((priv) => priv.privilege === "ViewDashboard")
    )
      return "/students";
    if (roles.some((role) => role.role === "Campus")) return "/campus";
    if (roles.some((role) => role.role === "Donor")) return "/donor";
    if (privileges.some((priv) => priv.privilege === "ViewPartners"))
      return "/partners";
    if (privileges.some((priv) => priv.privilege === "ViewPlacements"))
      return "/partners";
    return "/students";
  };

  if (isAuthenticated && !privateRoute)
    return <Navigate to={getRoute()} replace />;
  if (
    location.pathname.split("/")[1] === "admin" &&
    location.pathname.split("/")[2] === "create" &&
    ![
      "swanand@navgurukul.org",
      "vaibhav@navgurukul.org",
      "kirithiv@navgurukul.org",
      "anand@navgurukul.org",
    ].includes(loggedInUser.email)
  )
    if (isFetching) return <Loader container />;
    else return <NotHaveAccess />;
  if (isAuthenticated && roles.some((roleItem) => roleItem.role === "Admin"))
    return <div className="bodyComponent">{children}</div>;
  if (
    location.pathname.split("/")[1] === "partner" &&
    location.pathname.split("/")[2] === "add" &&
    !privileges.some((priv) => priv.privilege === "AddPartner")
  )
    if (isFetching) return <Loader container />;
    else return <NotHaveAccess />;
  // if (
  //   location.pathname.split("/")[1] === "admin" &&
  //   !roles.some((role) => role.role === "Admin")
  // )
  //   return <NotHaveAccess />;
  const currentPath = location.pathname.split("/")[1];
  let role;
  if (!privateRoute) return <div className="bodyComponent">{children}</div>;
  switch (currentPath) {
    case "admin":
      return (
        <div className="bodyComponent">
          {roles.some((roleItem) => roleItem.role === "Admin") ? (
            children
          ) : isFetching ? (
            <Loader container />
          ) : (
            <NotHaveAccess />
          )}
        </div>
      );
    case "students":
      if (location.pathname.split("/")[2] === "add") {
        return (
          <div className="bodyComponent">
            {privileges.some((priv) => priv.privilege === "AddNewStudent") ? (
              children
            ) : isFetching ? (
              <Loader container />
            ) : (
              <NotHaveAccess />
            )}
          </div>
        );
      }
      return (
        <div className="bodyComponent">
          {privileges.some((priv) => priv.privilege === "ViewDashboard") ? (
            children
          ) : isFetching ? (
            <Loader container />
          ) : (
            <NotHaveAccess />
          )}
        </div>
      );
    case "owner":
      return (
        <div className="bodyComponent">
          {privileges.some((priv) => priv.privilege === "ViewOwners") ? (
            children
          ) : isFetching ? (
            <Loader container />
          ) : (
            <NotHaveAccess />
          )}
        </div>
      );
    case "placements":
      return (
        <div className="bodyComponent">
          {privileges.some((priv) => priv.privilege === "ViewPlacements") ? (
            children
          ) : isFetching ? (
            <Loader container />
          ) : (
            <NotHaveAccess />
          )}
        </div>
      );
    // case "partner":
    //   return params.partnerId === undefined ||
    //     roles.some(
    //       (role) =>
    //         role.role === "Partner" &&
    //         role.access.findIndex(
    //           (accessItem) =>
    //             accessItem.access === parseInt(params.partnerId, 10)
    //         )
    //     ) ? (
    //     <div className="bodyComponent">{children}</div>
    //   ) : (
    //     <div className="bodyComponent">
    //       <NotHaveAccess />
    //     </div>
    //   );
    case "campus":
      role = roles.find((roleItem) => roleItem.role === "Campus");
      return (
        <div className="bodyComponent">
          {params.campusId === undefined ||
          (role &&
            role.access.findIndex(
              (accessItem) =>
                accessItem.access === parseInt(params.campusId, 10)
            ) !== -1) ? (
            children
          ) : isFetching ? (
            <Loader container />
          ) : (
            <NotHaveAccess />
          )}
        </div>
      );
    case "donor":
      role = roles.find((roleItem) => roleItem.role === "Donor");
      return (
        <div className="bodyComponent">
          {params.donorItem === undefined ||
          (role &&
            role.access.findIndex(
              (accessItem) =>
                accessItem.access === parseInt(params.donorItem, 10)
            ) !== -1) ? (
            children
          ) : isFetching ? (
            <Loader container />
          ) : (
            <NotHaveAccess />
          )}
        </div>
      );
    case "partners":
      return (
        <div className="bodyComponent">
          {privileges.some((priv) => priv.privilege === "ViewPartners") ? (
            children
          ) : isFetching ? (
            <Loader container />
          ) : (
            <NotHaveAccess />
          )}
        </div>
      );
    default:
      return (
        <div className="bodyComponent">
          {/* {privileges.some((priv) => priv.privilege === "ViewDashboard") ? (
            children
          ) : isFetching ? (
            <Loader container />
          ) : (
            <NotHaveAccess />
          )} */}
          {children}
        </div>
      );
  }
};

export default RequireAuth;

RequireAuth.defaultProps = {
  privateRoute: false,
};
