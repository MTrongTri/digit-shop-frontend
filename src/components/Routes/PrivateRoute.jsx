import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PrivateRoute({ children }) {
  const userState = useSelector((state) => state.user.userInfo);

  const location = useLocation();

  return userState ? (
    children
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
}

export default PrivateRoute;
